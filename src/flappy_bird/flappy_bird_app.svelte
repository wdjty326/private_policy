<script lang="ts">
    import svelteLogo from "./assets/logo.svg";
    import { onMount } from "svelte";
    import {
        languageAtom,
        setLanguage,
        setTerms,
        termsAtom,
    } from "./flappy_bird_store";
    import LangSelector from "../lib/LangSelector.svelte";
    import TermsSelector from "../lib/TermsSelector.svelte";

    let termsComponent: any = null;
    let loading = true;
    let error: string | null = null;

    $: terms = $termsAtom;
    $: language = $languageAtom;

    // 약관 컴포넌트 로드 함수
    async function loadTermsComponent(lang: string, termsDate: string) {
        loading = true;
        error = null;

        try {
            // 비동기로 컴포넌트 가져오기
            const module = await import(`./${lang}/${termsDate}.svelte`);
            termsComponent = module.default;
        } catch (err) {
            console.error("컴포넌트 로드 오류:", err);
            error = "약관을 로드하는 중 오류가 발생했습니다.";
        } finally {
            loading = false;
        }
    }

    // 언어나 약관 날짜가 변경될 때마다 컴포넌트 다시 로드
    $: {
        loadTermsComponent(language, terms);
    }

    // 초기 마운트 시에도 컴포넌트 로드
    onMount(() => {
        loadTermsComponent(language, terms);
    });

    // 언어 변경 핸들러
    function handleLanguageChange(newLang: string) {
        setLanguage(newLang);
    }

    // 약관 날짜 변경 핸들러
    function handleTermsChange(newTerms: string) {
        setTerms(newTerms);
    }
</script>

<main>
    <div class="logo-container">
        <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
        <h1>{language === "en" ? "Privacy Policy" : "개인정보처리방침"}</h1>
    </div>
    <div class="selectors">
        <LangSelector lang={language} onChange={handleLanguageChange} />
        <TermsSelector
            selectedTerms={terms}
            termsList={[
                { date: "20250101", description: "2025-01-01" },
                { date: "20250303", description: "2025-03-03" },
            ]}
            onChange={handleTermsChange}
        />
    </div>

    <!-- 약관 컴포넌트 표시 -->
    <div class="terms-container">
        {#if loading}
            <p>약관을 로드 중입니다...</p>
        {:else if error}
            <p class="error">{error}</p>
        {:else if termsComponent}
            <svelte:component this={termsComponent} />
        {/if}
    </div>
</main>

<style>
    .logo {
        height: 6em;
        will-change: filter;
        transition: filter 300ms;
    }
    .logo-container {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        align-items: center;
    }
    .selectors {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        margin-top: 1rem;
    }
    .terms-container {
        margin: 2rem 0;
        padding: 1rem;
        border: 1px solid #ddd;
        border-radius: 8px;
    }
    .error {
        color: red;
    }
</style>
