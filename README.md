[<img width="100%" src="banner.svg" alt="solid-color-picker">](https://thednp.github.io/solid-color-picker)

# Solid Color Picker
[![ci](https://github.com/thednp/solid-color-picker/actions/workflows/ci.yml/badge.svg)](https://github.com/thednp/solid-color-picker/actions/workflows/ci.yml)
[![Npm Version](https://img.shields.io/npm/v/@thednp/solid-color-picker)](https://www.npmjs.com/package/@thednp/solid-color-picker)
[![typescript version](https://img.shields.io/badge/typescript-5.5.4-brightgreen)](https://www.typescriptlang.org/)
[![eslint version](https://img.shields.io/badge/eslint-8.57.0-brightgreen)](https://github.com/eslint)
[![prettier version](https://img.shields.io/badge/prettier-3.3.3-brightgreen)](https://prettier.io/)
[![solid-js version](https://img.shields.io/badge/solid--js-1.8.21-brightgreen)](https://solidjs.com/)
[![vite version](https://img.shields.io/badge/vite-5.4.2-brightgreen)](https://github.com/vitejs)

The feature rich **ColorPicker** component for SolidJS, sourced with TypeScript, WAI-ARIA compliant and is mainly based on [ColorPicker](http://github.com/thednp/color-picker).

## Demo
[Live Demo](https://thednp.github.io/solid-color-picker)


## Highlights

- Accessibility Focus for WAI-ARIA compliance
- Built in translations for German, French, Russian, Arabic, Spanish, Portuguese, Romanian, Polish, Chinese, Korean and Japanese for accessibility
- TypeScript sourced code base
- Supporting HEX(a), RGB(a), HSL(a) and HWB(a)
- Supports keyboard and touch events as well as responsive design
- Automatic repositioning of the popup dropdown on show / window scroll
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
import '@thednp/solid-color-picker/style.css'

function App() {
  return <DefaultColorPicker value="turquoise" onChange={color => console.log(color)} />;
}
```
For additional component configuration options, please check the [demo](https://thednp.github.io/solid-color-picker).


## License

**Solid Color Picker** is released under the [MIT License](https://github.com/thednp/solid-color-picker/blob/master/LICENSE).
