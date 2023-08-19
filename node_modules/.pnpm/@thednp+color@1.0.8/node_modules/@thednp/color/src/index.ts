import nonColors from './util/nonColors';
import roundPart from './util/roundPart';
import webColors from './util/webColors';
import matchers from './util/matchers';
import isNonColor from './util/isNonColor';
import isColorType from './util/isColorType';
import isOnePointZero from './util/isOnePointZero';
import isPercentage from './util/isPercentage';
import isValidCSSUnit from './util/isValidCSSUnit';
import isColorName from './util/isColorName';
import bound01 from './util/bound01';
import boundAlpha from './util/boundAlpha';
import clamp01 from './util/clamp01';
import pad2 from './util/pad2';
import COLOR_FORMAT from './util/colorFormat';
import getRGBFromName from './util/getRGBFromName';
import convertHexToDecimal from './convert/convertHexToDecimal';
import convertDecimalToHex from './convert/convertDecimalToHex';
import parseIntFromHex from './convert/parseIntFromHex';
import ColorFormats from './util/colorFormats';
import ColorInputTypes from './util/colorInputTypes';
import rgbToHsl from './convert/rgbToHsl';
import hueToRgb from './convert/hueToRgb';
import hslToRgb from './convert/hslToRgb';
import rgbToHwb from './convert/rgbToHwb';
import hwbToRgb from './convert/hwbToRgb';
import rgbToHsv from './convert/rgbToHsv';
import hsvToRgb from './convert/hsvToRgb';
import rgbToHex from './convert/rgbToHex';
import rgbaToHex from './convert/rgbaToHex';
import stringInputToObject from './util/stringInputToObject';
import inputToRGB from './util/inputToRgb';

import type { RGBA } from './interface/rgba';
import type { HSLA } from './interface/hsla';
import type { HSVA } from './interface/hsva';
import type { HWBA } from './interface/hwba';

import { version } from '../package.json';

/**
 * Returns a new `Color` instance.
 *
 * @see https://github.com/bgrins/TinyColor
 */
export default class Color {
  // bring main utilities to front
  public static matchers = matchers;
  public static isOnePointZero = isOnePointZero;
  public static isPercentage = isPercentage;
  public static isValidCSSUnit = isValidCSSUnit;
  public static isNonColor = isNonColor;
  public static isColorName = isColorName;
  public static isColorType = isColorType;
  public static pad2 = pad2;
  public static clamp01 = clamp01;
  public static bound01 = bound01;
  public static boundAlpha = boundAlpha;
  public static getRGBFromName = getRGBFromName;
  public static convertHexToDecimal = convertHexToDecimal;
  public static convertDecimalToHex = convertDecimalToHex;
  public static rgbToHsl = rgbToHsl;
  public static rgbToHex = rgbToHex;
  public static rgbToHsv = rgbToHsv;
  public static rgbToHwb = rgbToHwb;
  public static rgbaToHex = rgbaToHex;
  public static hslToRgb = hsvToRgb;
  public static hsvToRgb = hsvToRgb;
  public static hueToRgb = hueToRgb;
  public static hwbToRgb = hwbToRgb;
  public static parseIntFromHex = parseIntFromHex;
  public static stringInputToObject = stringInputToObject;
  public static inputToRGB = inputToRGB;
  public static roundPart = roundPart;
  public static webColors = webColors;
  public static nonColors = nonColors;
  public static version = version;

  // main public properties
  public r: number;
  public g: number;
  public b: number;
  public a: number;
  public format: string;
  public ok: boolean;
  public originalInput?: string | Color | ColorInputTypes;

  // main public methods
  constructor(input?: ColorInputTypes | Partial<Color>, config?: ColorFormats) {
    const configFormat = config && COLOR_FORMAT.includes(config) ? config : '';

    // If input is already a `Color` or compatible object, clone its values
    const { r, g, b, a, ok, format } = inputToRGB(input);

    this.originalInput = input;
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    this.ok = ok;
    this.format = configFormat || format;
  }

  /**
   * Checks if the current input value is a valid colour.
   */
  get isValid(): boolean {
    return this.ok;
  }

  /**
   * Checks if the current colour requires a light text colour.
   */
  get isDark(): boolean {
    return this.brightness < 120;
  }

  /**
   * Returns the perceived luminance of a colour.
   *
   * @see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
   */
  get luminance(): number {
    const { r, g, b } = this;
    let R = 0;
    let G = 0;
    let B = 0;

    if (r <= 0.03928) {
      R = r / 12.92;
    } else {
      R = ((r + 0.055) / 1.055) ** 2.4;
    }
    if (g <= 0.03928) {
      G = g / 12.92;
    } else {
      G = ((g + 0.055) / 1.055) ** 2.4;
    }
    if (b <= 0.03928) {
      B = b / 12.92;
    } else {
      B = ((b + 0.055) / 1.055) ** 2.4;
    }
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  }

  /**
   * Returns the perceived brightness of the colour.
   */
  get brightness(): number {
    const { r, g, b } = this.toRgb();
    return (r * 299 + g * 587 + b * 114) / 1000;
  }

  /**
   * Returns the web colour name closest to the current colour.
   */
  get name(): string {
    const { r, g, b } = this.toRgb();
    const [colorName] = webColors
      .map(([name, rgb]): [string, number] => {
        const distance =
          // ((rgb.r - r) ** 2 + (rgb.g - g) ** 2 + (rgb.b - b) ** 2) ** 0.5; // standard
          (((rgb.r - r) * 0.3) ** 2 + ((rgb.g - g) * 0.6) ** 2 + ((rgb.b - b) * 0.1) ** 2) ** 0.5; // perceived
        return [name, distance];
      })
      .find(([, distance], _, ar) => {
        return distance === Math.min(...ar.map(([, d]) => d));
      }) as [string, number];

    return colorName;
  }

  /**
   * Returns the colour as an RGBA object.
   */
  toRgb(): RGBA {
    let { r, g, b, a } = this;

    [r, g, b] = [r, g, b].map(n => roundPart(n * 255 * 100) / 100);
    a = roundPart(a * 100) / 100;
    return {
      r,
      g,
      b,
      a,
    };
  }

  /**
   * Returns the RGBA values concatenated into a CSS3 Module string format.
   * * rgb(255,255,255)
   * * rgba(255,255,255,0.5)
   */
  toRgbString(): string {
    const { r, g, b, a } = this.toRgb();
    const [R, G, B] = [r, g, b].map(roundPart);

    return a === 1 ? `rgb(${R}, ${G}, ${B})` : `rgba(${R}, ${G}, ${B}, ${a})`;
  }

  /**
   * Returns the RGBA values concatenated into a CSS4 Module string format.
   * * rgb(255 255 255)
   * * rgb(255 255 255 / 50%)
   */
  toRgbCSS4String(): string {
    const { r, g, b, a } = this.toRgb();
    const [R, G, B] = [r, g, b].map(roundPart);
    const A = a === 1 ? '' : ` / ${roundPart(a * 100)}%`;

    return `rgb(${R} ${G} ${B}${A})`;
  }

  /**
   * Returns the hexadecimal value of the colour. When the parameter is *true*
   * it will find a 3 characters shorthand of the decimal value.
   */
  toHex(allow3Char?: boolean | undefined): string {
    const { r, g, b, a } = this.toRgb();

    return a === 1 ? rgbToHex(r, g, b, allow3Char) : rgbaToHex(r, g, b, a, allow3Char);
  }

  /**
   * Returns the CSS valid hexadecimal vaue of the colour. When the parameter is *true*
   * it will find a 3 characters shorthand of the value.
   */
  toHexString(allow3Char?: boolean | undefined): string {
    return `#${this.toHex(allow3Char)}`;
  }

  /**
   * Returns the HEX8 value of the colour.
   */
  toHex8(allow4Char?: boolean | undefined): string {
    const { r, g, b, a } = this.toRgb();

    return rgbaToHex(r, g, b, a, allow4Char);
  }

  /**
   * Returns the HEX8 value of the colour.
   */
  toHex8String(allow4Char?: boolean | undefined): string {
    return `#${this.toHex8(allow4Char)}`;
  }

  /**
   * Returns the colour as a HSVA object.
   */
  toHsv(): HSVA {
    const { r, g, b, a } = this;
    const { h, s, v } = rgbToHsv(r, g, b);

    return {
      h,
      s,
      v,
      a,
    };
  }

  /**
   * Returns the colour as an HSLA object.
   */
  toHsl(): HSLA {
    const { r, g, b, a } = this;
    const { h, s, l } = rgbToHsl(r, g, b);

    return {
      h,
      s,
      l,
      a,
    };
  }

  /**
   * Returns the HSLA values concatenated into a CSS3 Module format string.
   * * `hsl(150, 100%, 50%)`
   * * `hsla(150, 100%, 50%, 0.5)`
   */
  toHslString(): string {
    let { h, s, l, a } = this.toHsl();
    h = roundPart(h * 360);
    s = roundPart(s * 100);
    l = roundPart(l * 100);
    a = roundPart(a * 100) / 100;

    return a === 1 ? `hsl(${h}, ${s}%, ${l}%)` : `hsla(${h}, ${s}%, ${l}%, ${a})`;
  }

  /**
   * Returns the HSLA values concatenated into a CSS4 Module format string.
   * * `hsl(150deg 100% 50%)`
   * * `hsl(150deg 100% 50% / 50%)`
   */
  toHslCSS4String(): string {
    let { h, s, l, a } = this.toHsl();
    h = roundPart(h * 360);
    s = roundPart(s * 100);
    l = roundPart(l * 100);
    a = roundPart(a * 100);
    const A = a < 100 ? ` / ${roundPart(a)}%` : '';

    return `hsl(${h}deg ${s}% ${l}%${A})`;
  }

  /**
   * Returns the colour as an HWBA object.
   */
  toHwb(): HWBA {
    const { r, g, b, a } = this;
    const { h, w, b: bl } = rgbToHwb(r, g, b);
    return {
      h,
      w,
      b: bl,
      a,
    };
  }

  /**
   * Returns the HWBA values concatenated into a string.
   */
  toHwbString(): string {
    let { h, w, b, a } = this.toHwb();
    h = roundPart(h * 360);
    w = roundPart(w * 100);
    b = roundPart(b * 100);
    a = roundPart(a * 100);
    const A = a < 100 ? ` / ${roundPart(a)}%` : '';

    return `hwb(${h}deg ${w}% ${b}%${A})`;
  }

  /**
   * Sets the alpha value of the current colour.
   */
  setAlpha(alpha?: number): Color {
    if (typeof alpha !== 'number') return this;
    this.a = boundAlpha(alpha);
    return this;
  }

  /**
   * Saturate the colour with a given amount.
   */
  saturate(amount?: number): Color {
    if (typeof amount !== 'number') return this;
    const { h, s, l } = this.toHsl();
    const { r, g, b } = hslToRgb(h, clamp01(s + amount / 100), l);

    Object.assign(this, { r, g, b });
    return this;
  }

  /**
   * Desaturate the colour with a given amount.
   */
  desaturate(amount?: number): Color {
    return typeof amount === 'number' ? this.saturate(-amount) : this;
  }

  /**
   * Completely desaturates a colour into greyscale.
   * Same as calling `desaturate(100)`
   */
  greyscale(): Color {
    return this.saturate(-100);
  }

  /**
   * Increase the colour lightness with a given amount.
   */
  lighten(amount?: number): Color {
    if (typeof amount !== 'number') return this;

    const { h, s, l } = this.toHsl();
    const { r, g, b } = hslToRgb(h, s, clamp01(l + amount / 100));

    Object.assign(this, { r, g, b });
    return this;
  }

  /**
   * Decrease the colour lightness with a given amount.
   */
  darken(amount?: number): Color {
    return typeof amount === 'number' ? this.lighten(-amount) : this;
  }

  /**
   * Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
   * Values outside of this range will be wrapped into this range.
   */
  spin(amount?: number): Color {
    if (typeof amount !== 'number') return this;

    const { h, s, l } = this.toHsl();
    const { r, g, b } = hslToRgb(clamp01(((h * 360 + amount) % 360) / 360), s, l);

    Object.assign(this, { r, g, b });
    return this;
  }

  /** Returns a clone of the current `Color` instance. */
  clone(): Color {
    return new Color(this);
  }

  /**
   * Returns the colour value in CSS valid string format.
   */
  toString(allowShort?: boolean | undefined): string {
    const { format } = this;

    if (format === 'hex') return this.toHexString(allowShort);
    if (format === 'hsl') return this.toHslString();
    if (format === 'hwb') return this.toHwbString();

    return this.toRgbString();
  }
}
