import { ar } from './ar.js';
import { en } from './en.js';

const dictionaries = { ar, en };

type Locale = keyof typeof dictionaries;
type Dictionary = (typeof dictionaries)[Locale];

type TranslationKey = keyof Dictionary;

export function t(locale: Locale, key: TranslationKey): string {
  return dictionaries[locale][key] ?? dictionaries.en[key];
}
