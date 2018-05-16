#!/usr/bin/env node

const fs = require('fs');
const parseDir = require('./src/parse-directory.js');
const svgGen = require('./src/elm-svg-generator.js');
const ProgressBar = require('progress')
const ejs = require('ejs')

const destinationPath = (process.argv[3] || ".")
const destinationFile = (destinationPath + "/Assets.elm")

if (!!process.argv[2]) {
  var filesInPath = parseDir(process.argv[2]);
  var bar =
    new ProgressBar(':bar\n:current of :total svg files processed',
      { total: filesInPath.length, width: 80 }
    );

  console.log("Creating a new Assets.elm file in " + destinationPath);

  if (fs.existsSync(destinationFile)) {
    fs.unlink(destinationFile);
  }

  ejs.renderFile("./src/templates/Assets.header.elm.ejs",
    {},
    'utf8',
    function(err, str){
      fs.appendFileSync(destinationFile, str);
    }
  );

  filesInPath.forEach(function(element) {
    const svgContent =
      fs.readFileSync(element.path, 'utf8')
      .replace(/<!--(.*?)-->/gm, "");

    ejs.renderFile("./src/templates/Assets.function.elm.ejs",
      { elmFunction: {
          name: element.name,
          body: svgContent
        }
      },
      'utf8',
      function(err, str) {
        fs.appendFileSync(destinationFile, str);
      }
    );

    bar.tick();
  });

  console.log();
} else {
	console.error("No directory, please provide one a directory with svg files.");
	process.exit(1);
}

process.on('uncaughtException', err => {
	console.log(`Uncaught exception:\n`, err);
	process.exit(1);
});

