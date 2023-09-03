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
  controlPositions: (() => {}) as Accessor<typeof initialControlPositions>,
  setControlPositions: (() => {}) as Setter<typeof initialControlPositions>,
  update: (_newColor: Color) => {},
  updateControlPositions: () => {},
});

export const usePickerContext = () => useContext(PickerContext);
