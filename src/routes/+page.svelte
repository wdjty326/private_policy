<script lang="ts">
  import { language } from '$lib';
  import { t } from '$lib/i18n';
  import LanguageSelector from '$lib/components/LanguageSelector.svelte';
  import PageSelector from '$lib/components/PageSelector.svelte';
  
  // 간단한 번역 객체
  const translations: Record<string, Record<string, string>> = {
    ko: {
      welcome: '환영합니다!',
      description: '이 웹사이트는 스벨트로 만들어졌습니다.'
    },
    en: {
      welcome: 'Welcome!',
      description: 'This website is built with Svelte.'
    }
  };
  
  // 현재 언어에 따른 번역 가져오기
  $: localT = translations[$language] || translations.ko;
</script>

<main>
  <LanguageSelector />
  <PageSelector />
</main>

<style>
  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }
</style>
