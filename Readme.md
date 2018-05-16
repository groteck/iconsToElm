# iconsToElm
This `CLI` tool creates an Assets.elm file from a directory with svg files.

## Install

```bash
yarn add icons-to-elm
```

## Use the cli

Generates a `Assets.elm` file in the current path:

```bash
yarn run iconsToElm svgDir
```

Generates a `Assets.elm` file in the specified path (`src`):

```bash
yarn run iconsToElm svgDir src
```

## Use it on your elm project

1. Install *rnons/elm-svg-parser*: `elm-package install -y rnons/elm-svg-parser`
2. Import the Assets module into your elm file and call one icon.

```Elm
module Main exposing (..)

import Assets
import Html exposing (Html)


main : Html msg
main =
    Assets.iconExample
```

**NOTE:** You can check the `example` directory for extra help.
