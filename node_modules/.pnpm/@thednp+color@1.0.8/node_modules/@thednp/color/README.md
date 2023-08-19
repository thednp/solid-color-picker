## Color

[![Coverage Status](https://coveralls.io/repos/github/thednp/color/badge.svg)](https://coveralls.io/github/thednp/color)
[![ci](https://github.com/thednp/color/actions/workflows/ci.yml/badge.svg)](https://github.com/thednp/color/actions/workflows/ci.yml)
[![NPM Version](https://img.shields.io/npm/v/@thednp/color.svg)](https://www.npmjs.com/package/@thednp/color)
[![NPM Downloads](https://img.shields.io/npm/dm/@thednp/color.svg)](http://npm-stat.com/charts.html?package=@thednp/color)
[![jsDeliver](https://img.shields.io/jsdelivr/npm/hw/@thednp/color)](https://www.jsdelivr.com/package/npm/@thednp/color)
[![typescript version](https://img.shields.io/badge/typescript-5.1.6-brightgreen)](https://www.typescriptlang.org/)
[![eslint version](https://img.shields.io/badge/eslint-8.44.0-brightgreen)](https://github.com/eslint)
[![prettier version](https://img.shields.io/badge/prettier-2.8.8-brightgreen)](https://prettier.io/)
[![cypress version](https://img.shields.io/badge/cypress-12.16.0-brightgreen)](https://cypress.io/)
[![vite version](https://img.shields.io/badge/vite-4.3.9-brightgreen)](https://github.com/vitejs)

A TypeScript flavored fork of the excelent [TinyColor](https://github.com/bgrins/TinyColor) optimized for [ColorPicker](https://github.com/thednp/color-picker) with new features and improvements:

- added support for HWB(a) colors (Hue, Whiteness, Blackness);
- added support for CSS4 Color module (`rgb(40 74 200 / 90%)`, `hsl(227deg 67% 47% / 90%)`)
- improved regular expressions;
- tree shaking;
- slightly faster performance;
- stronger and more strict types.

### Install

```js
npm install @thednp/color
```

### Quick Usage

```js
import Color from "@thednp/color";

// provide a web colour, the constructor will determine
const myHEXColor = new Color("red", "hex").toString();
// => { r: 250, g: 0, b: 0, a: 1, ok: true, originalInput: 'red', ...}

// use the value where you need it
Object.assign(myElement.style, { color: myHEXColor.toString() });
// => #ff0000
```

### Wiki

For a more detailed guide please visit the wiki page at [Color Wiki](https://github.com/thednp/color/wiki)!

### Thanks

- Brian Grinstead for his original [TinyColor](https://github.com/bgrins/TinyColor)
- Scott Cooper for his awesome version of [TinyColor](https://github.com/scttcper/tinycolor)

### License

**Color** is released under the [MIT License](https://github.com/thednp/color/blob/master/LICENSE)
