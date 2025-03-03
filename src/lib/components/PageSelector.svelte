<script lang="ts">
  import { onMount } from 'svelte';
  import { t } from '$lib/i18n';
  import { language } from '$lib/stores/language';
  
  // 현재 선택된 페이지 컴포넌트
  let selectedComponent: any = null;
  let loading = false;
  let error: string | null = null;
  let selectedDate: string = '20250303'; // 기본값 20250303으로 설정
  
  // 사용 가능한 페이지 정의
  const availablePages = {
    en: ['20250101', '20250303'],
    ko: ['20250303'] // ko는 20250101이 없음
  };
  
  // 현재 언어에 따른 사용 가능한 페이지 목록
  $: currentAvailablePages = availablePages[$language as keyof typeof availablePages] || [];
  
  // 페이지 비동기 로드 함수
  async function loadPage(date: string) {
    if (!date) return;
    
    loading = true;
    error = null;
    
    try {
      const currentLang = $language;
      
      // 요청된 날짜가 현재 언어에서 사용 가능한지 확인
      if (!availablePages[currentLang as keyof typeof availablePages].includes(date)) {
        // 사용 불가능한 경우 오류 메시지 표시
        error = `${currentLang} 언어에서는 ${date} 날짜의 페이지를 사용할 수 없습니다.`;
        loading = false;
        return;
      }
      
      // 동적 임포트를 사용하여 페이지 컴포넌트 로드 (클라이언트 사이드에서 작동하도록 수정)
      let module;
      if (currentLang === 'en') {
        if (date === '20250101') {
          module = await import('../pages/en/en20250101.svelte');
        } else if (date === '20250303') {
          module = await import('../pages/en/en20250303.svelte');
        }
      } else if (currentLang === 'ko') {
        if (date === '20250303') {
          module = await import('../pages/ko/ko20250303.svelte');
        }
      }
      
      if (module) {
        selectedComponent = module.default;
      } else {
        throw new Error('페이지를 찾을 수 없습니다.');
      }
    } catch (err) {
      console.error('페이지 로드 오류:', err);
      error = '페이지를 로드하는 중 오류가 발생했습니다.';
    } finally {
      loading = false;
    }
  }
  
  // 선택 상자 변경 핸들러
  function handleSelectChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    selectedDate = target.value;
    if (selectedDate) {
      loadPage(selectedDate);
    } else {
      selectedComponent = null;
    }
  }
  
  // 언어가 변경될 때 현재 선택된 페이지를 다시 로드하거나 초기화
  $: {
    if ($language) {
      // 현재 선택된 날짜가 새 언어에서 사용 가능한지 확인
      if (selectedDate && !currentAvailablePages.includes(selectedDate)) {
        selectedDate = '20250303'; // 사용 불가능한 경우 기본값으로 설정
        loadPage(selectedDate);
      } else if (selectedDate) {
        // 선택된 날짜가 있고 사용 가능하면 페이지 다시 로드
        loadPage(selectedDate);
      }
    }
  }
  
  // 날짜를 사람이 읽기 쉬운 형식으로 변환
  function formatDate(dateStr: string): string {
    if (dateStr === '20250101') return '2025-01-01 Privacy Policy';
    if (dateStr === '20250303') return '2025-03-03 Privacy Policy';
    return dateStr;
  }
  
  // 컴포넌트가 마운트될 때 기본 페이지 로드
  onMount(() => {
    loadPage(selectedDate);
  });
</script>

<div class="page-selector">
  <div class="select-container">
    <select value={selectedDate} on:change={handleSelectChange}>
      <option value="">-- 페이지 선택 --</option>
      {#each currentAvailablePages as date}
        <option value={date}>{formatDate(date)}</option>
      {/each}
    </select>
  </div>
  
  {#if loading}
    <div class="loading">로딩 중...</div>
  {:else if error}
    <div class="error">{error}</div>
  {:else if selectedComponent}
    <div class="page-container">
      <svelte:component this={selectedComponent} />
    </div>
  {/if}
</div>

<style>
  .page-selector {
    margin: 2rem 0;
  }
  
  .select-container {
    margin-bottom: 1rem;
  }
  
  select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: white;
    font-size: 1rem;
    cursor: pointer;
  }
  
  select:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  }
  
  .loading {
    padding: 1rem;
    background-color: #f0f0f0;
    border-radius: 4px;
    text-align: center;
  }
  
  .error {
    padding: 1rem;
    background-color: #ffebee;
    color: #c62828;
    border-radius: 4px;
    text-align: center;
  }
  
  .page-container {
    margin-top: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
  }
</style> 