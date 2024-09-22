import type { LanguagePack, SupportedLanguage } from '../types/types';
import English from './en/translation.json';
import Russian from './ru/translation.json';
import French from './fr/translation.json';
import Arabian from './ar/translation.json';
import Romanian from './ro/translation.json';
import German from './de/translation.json';
import Chinese from './zh/translation.json';
import Spanish from './es/translation.json';
import Portuguese from './pt/translation.json';
import Polish from './pl/translation.json';
import Japanese from './ja/translation.json';
import Korean from './ko/translation.json';

export const languagePacks: Record<SupportedLanguage, LanguagePack> = {
  en: English,
  ru: Russian,
  ar: Arabian,
  fr: French,
  de: German,
  ro: Romanian,
  es: Spanish,
  pt: Portuguese,
  pl: Polish,
  zh: Chinese,
  ja: Japanese,
  ko: Korean,
};

export const getLanguageStrings = (lang?: SupportedLanguage) => {
  return languagePacks[lang || /* istanbul ignore next @preserve */ 'en'];
};
