<script lang="ts">
  import { language, setLanguage } from '$lib/stores/language';
  
  const languages = [
    { code: 'ko', name: '한국어' },
    { code: 'en', name: 'English' }
  ];
</script>

<div class="language-selector">
  <select value={$language} on:change={(e) => setLanguage((e.target as HTMLSelectElement).value)}>
    {#each languages as lang}
      <option value={lang.code}>{lang.name}</option>
    {/each}
  </select>
</div>

<style>
  .language-selector {
    margin: 1rem 0;
  }
  
  select {
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
</style> 