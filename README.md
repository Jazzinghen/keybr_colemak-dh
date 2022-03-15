# KeyBR.com Colemak-dh support userscript

This is a simple userscript to add support for the Colemak mod [1](Colemak-dh) to the typing training website [2](KeyBR)

## Features

- Colemak-dh layout on both the lesson and profile pages
- Correct placement of key relative frequencies on the profile page
- Colemak-dh finger placement highlight on the lesson's keyboard layout

## How it works

The userscript checks when the keyboard SVG has loaded and then replaces text and metadata on each key based on a mapping. The finger zones are set by appending an extra class to the keys. I told you it was simple :D

## Credits

This script would nyt exist if I had not found an userscript written by [3](Zyst) (I do not remember where I found it). After a while the script broke and I decided to rewrite it to support the new site layout.

## Development

The project was bootstrapped using [4](Violentmonkey's userscript generator) for NPM. This adds a lot of stuff for the discerning Javascript developer, which I am not, as you might have noticed from my repositories.
However the project is written in Typescript and supports `yarn` auto deployment:

``` sh
yarn dev
```

To build the script you can use:

```sh
yarn build
```

[1]: https://colemakmods.github.io/mod-dh/
[2]: https://www.keybr.com/
[3]: https://github.com/Zyst
[4]: https://github.com/violentmonkey/generator-userscript
