const fs = require('fs');
const path = require('path');
const pattern = '.svg';

class Result {
  constructor(filePath) {
    function camelize(str) {
      return str.replace(/(\-[a-z])/g, function($1) {
        return $1.toUpperCase().replace('-','');
      });
    }

    this.name = camelize(path.parse(filePath).name);
    this.path = filePath;
  }

  serialized() {
    return { name: this.name, path: this.path }
  }
}

module.exports = function searchRecursive(dir) {
  // This is where we store pattern matches of all files inside the directory
  var results = [];

  // Read contents of directory
  fs.readdirSync(dir).forEach(function (dirInner) {
    // Obtain absolute path
    dirInner = path.resolve(dir, dirInner);

    // Get stats to determine if path is a directory or a file
    var stat = fs.statSync(dirInner);

    // If path is a directory, scan it and combine results
    if (stat.isDirectory()) {
      results = results.concat(searchRecursive(dirInner));
    }

    // If path is a file and ends with pattern then push it onto results
    if (stat.isFile() && dirInner.endsWith(pattern)) {
      results.push((new Result(dirInner)).serialized());
    }
  });

  return results;
};
