import type { LanguagePack, SupportedLanguage } from '../types/types';
import English from './en/translation.json';
import French from './fr/translation.json';
import Romanian from './ro/translation.json';
import German from './de/translation.json';
import Russian from './ru/translation.json';
import Chinese from './zh/translation.json';
import Spanish from './es/translation.json';
import Portuguese from './pt/translation.json';
import Polish from './pl/translation.json';
import Japanese from './ja/translation.json';
import Korean from './ko/translation.json';

const LanguagePacks: Record<SupportedLanguage, LanguagePack> = {
  en: English,
  ru: Russian,
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

const getLanguageStrings = (lang?: SupportedLanguage) => {
  return LanguagePacks[lang || 'en'];
};

export default getLanguageStrings;
