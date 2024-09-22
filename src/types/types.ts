import type { Accessor, JSX } from 'solid-js';

export type ColorList = string[];

export type SupportedLanguage = 'en' | 'ru' | 'ar' | 'fr' | 'de' | 'ro' | 'es' | 'pl' | 'pt' | 'zh' | 'ja' | 'ko';
export type SupportedFormat = 'rgb' | 'hex' | 'hwb' | 'hsl';

export type LanguagePack = ColorNames & ColorPickerLabels;

export interface ColorPickerLabels {
  pickerLabel: string;
  appearanceLabel: string;
  valueLabel: string;
  toggleLabel: string;
  placeholder: string;
  presetsLabel: string;
  defaultsLabel: string;
  formatLabel: string;
  alphaLabel: string;
  hexLabel: string;
  hueLabel: string;
  whitenessLabel: string;
  blacknessLabel: string;
  saturationLabel: string;
  lightnessLabel: string;
  redLabel: string;
  greenLabel: string;
  blueLabel: string;
  [key: string]: string;
}

export interface ColorNames {
  white: string;
  black: string;
  grey: string;
  red: string;
  orange: string;
  brown: string;
  gold: string;
  olive: string;
  yellow: string;
  lime: string;
  green: string;
  teal: string;
  cyan: string;
  blue: string;
  violet: string;
  magenta: string;
  pink: string;
}

/**
 * typical {hue: 0, hueSteps: 12, lightSteps: 10, saturation: 85}
 */
export type ColorPresets = {
  hue: number;
  hueSteps: number;
  lightSteps: number;
  saturation?: number;
};

export type ColorKeywords = (string | Record<string, string>)[];

export type ColorPickerProps = {
  id?: string;
  value?: string;
  theme?: 'light' | 'dark';
  lang?: SupportedLanguage;
  format?: SupportedFormat;
  class?: string;
  placeholder?: string;
  onChange?: (color: string) => void;
  colorPresets?: ColorPresets;
  colorKeywords?: ColorKeywords;
  locale?: LanguagePack;
};

export type ControlProps = {
  stringValue: Accessor<string>;
};

export type PickerProps = {
  id: string;
  ref: HTMLDivElement;
  class: Accessor<string>;
};

export type PresetsProps = {
  colorPresets: Accessor<ColorPresets>;
  keyHandler: JSX.EventHandlerUnion<HTMLElement, KeyboardEvent>;
};

export type KeyProps = {
  colorKeywords: Accessor<ColorKeywords>;
  keyHandler: JSX.EventHandlerUnion<HTMLElement, KeyboardEvent>;
};

export type MenuProps = {
  id: string;
  ref: HTMLDivElement;
  expanded: boolean;
  class: Accessor<string>;
  colorPresets: Accessor<ColorPresets | undefined>;
  colorKeywords: Accessor<ColorKeywords | undefined>;
  toggleMenu: () => void;
  locale: Accessor<LanguagePack>;
};
