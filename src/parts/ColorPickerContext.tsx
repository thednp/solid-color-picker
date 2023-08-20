import Color from '@thednp/color';
import { Accessor, Setter, createContext, useContext } from 'solid-js';
import initialControlPositions from '../util/initialControlPositions';
import type { LanguagePack, SupportedFormat } from '../types/types';

export const PickerContext = createContext({
  format: (() => {}) as Accessor<SupportedFormat>,
  color: (() => {}) as Accessor<Color>,
  setColor: (() => {}) as Setter<Color>,
  locale: (() => {}) as Accessor<LanguagePack>,
  drag: (() => {}) as Accessor<HTMLElement | undefined>,
  setDrag: (() => {}) as Setter<HTMLElement | undefined>,
  value: (() => '') as Accessor<string>,
  setValue: (() => {}) as Setter<string>,
  visuals: (() => []) as unknown as Accessor<[HTMLElement, HTMLElement, HTMLElement]>,
  knobs: (() => []) as unknown as Accessor<[HTMLElement, HTMLElement, HTMLElement]>,
  inputs: (() => []) as unknown as Accessor<[HTMLElement, HTMLElement, HTMLElement]>,
  appearance: (() => '') as unknown as Accessor<string>,
  controlPositions: (() => {}) as Accessor<typeof initialControlPositions>,
  setControlPositions: (() => {}) as Setter<typeof initialControlPositions>,
  update: (_newColor: Color) => {},
  updateControlPositions: () => {},
  hue: (() => 0) as Accessor<number>,
  saturation: (() => 0) as Accessor<number>,
  lightness: (() => 0) as Accessor<number>,
  alpha: (() => 0) as Accessor<number>,
  fill: (() => {}) as Accessor<Color>,
  fillGradient: (() => '') as Accessor<string>,
});

export const usePickerContext = () => useContext(PickerContext);
