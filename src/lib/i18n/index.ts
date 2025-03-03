import { derived } from 'svelte/store';
import { language } from '../stores/language';
import { translations } from './translations';

// 현재 언어에 따른 번역 스토어 생성
export const t = derived(language, ($language) => {
  return (key: string) => {
    const lang = $language in translations ? $language : 'ko';
    return translations[lang][key] || key;
  };
}); 