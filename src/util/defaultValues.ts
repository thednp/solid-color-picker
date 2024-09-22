import { getLanguageStrings } from '../locales/getLanguageStrings';
import type { SupportedFormat, SupportedLanguage, ColorKeywords, ColorPresets } from '../types/types';
const defaultValues = {
  value: 'rgb(255,0,0)',
  placeholder: getLanguageStrings('en').placeholder,
  format: 'rgb' as SupportedFormat,
  lang: 'en' as SupportedLanguage,
  theme: 'dark' as 'dark' | 'light',
  colorPresets: undefined as ColorPresets | undefined,
  colorKeywords: undefined as ColorKeywords | undefined,
};

export default defaultValues;
