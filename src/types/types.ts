import type { Accessor, JSXElement } from 'solid-js';
import ColorPicker from '@thednp/color-picker';

const { colorPickerLabels, colorNames } = ColorPicker;

export type SupportedFormat = 'rgb' | 'hex' | 'hwb' | 'hsl';

export type ColorNames = {
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
};

/**
 * typical {hue: 0, hueSteps: 12, lightSteps: 10, saturation: 85}
 */
export type ColorPresets = {
  hue: number;
  hueSteps: number;
  lightSteps: number;
  saturation?: number;
};

export type ColorKeywords = (string | { label: string; value: string })[];

export type ColorPickerProps = {
  id?: string;
  value?: string;
  format?: SupportedFormat;
  class?: string;
  placeholder?: string;
  onChange?: (color: string) => void;
  colorPickerLabels?: typeof colorPickerLabels;
  colorNames?: typeof colorNames;
  colorPresets?: ColorPresets;
  colorKeywords?: ColorKeywords;
};

export type ControlProps = {
  format: Accessor<SupportedFormat>;
  colorPickerLabels: typeof ColorPicker.colorPickerLabels;
  stringValue: Accessor<string>;
};

export type PickerProps = {
  id: string;
  ref: HTMLDivElement;
  class: Accessor<string>;
  format: Accessor<SupportedFormat>;
  colorPickerLabels: typeof colorPickerLabels;
  colorNames: Record<string, string>;
};

export type MenuProps = {
  id: string;
  ref: HTMLDivElement;
  class: Accessor<string>;
  format: Accessor<SupportedFormat>;
  colorPickerLabels: typeof colorPickerLabels;
  colorPresets?: ColorPresets;
  colorKeywords?: ColorKeywords;
  children?: JSXElement;
};
