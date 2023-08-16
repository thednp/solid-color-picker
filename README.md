[<img width="100%" src="banner.svg" alt="solid-color-picker">](https://solid-color-picker.netlify.app/)

# Solid Color Picker

[![Npm Version](https://img.shields.io/npm/v/solid-color-picker)](https://www.npmjs.com/package/solid-color-picker)
[![License](https://img.shields.io/npm/l/solid-color-picker)](https://npm-stat.com/charts.html?package=solid-color-picker)
[![Downloads](https://img.shields.io/npm/dm/solid-color-picker)](LICENSE)

The feature rich **ColorPicker** component for SolidJS, sourced with TypeScript, WAI-ARIA compliant and is mainly based on [ColorPicker](http://github.com/thednp/color-picker).

## Demo
[Live Demo](https://solid-color-picker.netlify.app/)


## Highlights

- Accessibility Focus for WAI-ARIA compliance
- TypeScript sourced code base
- Supporting HEX(a), RGB(a), HSL(a) and HWB, the last three also in CSS4 Color Module flavours
- Supports keyboard and touch events as well as responsive design
- Automatic repositioning of the popup dropdown on show / window scroll
- SCSS sources with minimal style required
- Right To Left Languages Supported


## Installation

```bash
npm i @thednp/solid-color-picker
# or
yarn add @thednp/solid-color-picker
# or
pnpm add @thednp/solid-color-picker
```

## Usage

```tsx
import { DefaultColorPicker } from '@thednp/solid-color-picker'

function App() {
  return <DefaultColorPicker value="turquoise" onChange={color => console.log(color)} />;
}
```

## License

**Solid Color Picker** is released under the [MIT License](https://github.com/thednp/solid-color-picker/blob/master/LICENSE).
