import Color from "@thednp/color";
import { Accessor, createContext, Setter, useContext } from "solid-js";
import initialControlPositions from "../util/initialControlPositions";
import type { LanguagePack, SupportedFormat } from "../types/types";

export type ColorPickerContext = {
  format: Accessor<SupportedFormat>;
  color: Accessor<Color>;
  setColor: Setter<Color>;
  locale: Accessor<LanguagePack>;
  drag: Accessor<HTMLElement | undefined>;
  setDrag: Setter<HTMLElement | undefined>;
  value: Accessor<string>;
  setValue: Setter<string>;
  setInputValue: Setter<string>;
  controlPositions: Accessor<typeof initialControlPositions>;
  setControlPositions: Setter<typeof initialControlPositions>;
  updateControlPositions: () => void;
};

export const PickerContext = createContext({} as ColorPickerContext);

export const usePickerContext = () => useContext(PickerContext);
