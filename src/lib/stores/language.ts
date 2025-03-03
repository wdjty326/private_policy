import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// 기본 언어 설정 (브라우저 설정 또는 'ko' 기본값 사용)
const defaultLanguage = browser 
  ? localStorage.getItem('language') || navigator.language.split('-')[0] || 'ko' 
  : 'ko';

// 언어 스토어 생성
export const language = writable<string>(defaultLanguage);

// 언어 변경 함수
export function setLanguage(newLanguage: string) {
  language.set(newLanguage);
  if (browser) {
    localStorage.setItem('language', newLanguage);
  }
} 