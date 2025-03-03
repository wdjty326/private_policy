<script lang="ts">
    // 현재 선택된 언어
    export let lang: string;

    // 사용 가능한 언어 목록 (코드와 이름)
    export let languages: { code: string; name: string }[] = [
        { code: "en", name: "English" },
        { code: "ko", name: "한국어" },
    ];

    // 언어 변경 시 호출될 콜백 함수
    export let onChange: (newLang: string) => void;

    // 드롭다운 열림/닫힘 상태
    let isOpen = false;

    // 드롭다운 토글 함수
    function toggleDropdown() {
        isOpen = !isOpen;
    }

    // 언어 선택 함수
    function selectLanguage(code: string) {
        if (code !== lang) {
            lang = code;
            onChange(code);
        }
        isOpen = false;
    }

    // 현재 선택된 언어의 이름 가져오기
    $: selectedLanguage = languages.find((l) => l.code === lang)?.name || lang;

    // 클릭 이벤트 핸들러 (외부 클릭 시 드롭다운 닫기)
    function handleClickOutside(event: MouseEvent) {
        const target = event.target as HTMLElement;
        const selector = document.querySelector(".lang-selector");

        if (selector && !selector.contains(target)) {
            isOpen = false;
        }
    }

    // 컴포넌트 마운트 시 이벤트 리스너 추가
    import { onMount, onDestroy } from "svelte";

    onMount(() => {
        document.addEventListener("click", handleClickOutside);
    });

    onDestroy(() => {
        document.removeEventListener("click", handleClickOutside);
    });
</script>

<div class="lang-selector">
    <button class="selected-lang" on:click={toggleDropdown}>
        <span>{selectedLanguage}</span>
        <svg
            class={isOpen ? "arrow-up" : "arrow-down"}
            viewBox="0 0 24 24"
            width="16"
            height="16"
        >
            <path d="M7 10l5 5 5-5z" />
        </svg>
    </button>

    {#if isOpen}
        <div class="dropdown">
            {#each languages as language}
                <div
                    role="button"
                    class="dropdown-item {language.code === lang
                        ? 'active'
                        : ''}"
                    on:click={() => selectLanguage(language.code)}
                >
                    {language.name}
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    .lang-selector {
        position: relative;
        display: inline-block;
        font-family: Arial, sans-serif;
        z-index: 100;
    }

    .selected-lang {
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 120px;
        padding: 8px 12px;
        background-color: #242424;
        border: 1px solid #ddd;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: border-color 0.2s;
    }

    .selected-lang:hover {
        border-color: #aaa;
    }

    .dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        margin-top: 4px;
        background-color: #242424;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }

    .dropdown-item {
        padding: 8px 12px;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .dropdown-item:hover {
        background-color: #f5f5f5;
    }

    .dropdown-item.active {
        background-color: #e6f7ff;
        color: #1890ff;
        font-weight: 500;
    }

    svg {
        fill: currentColor;
        transition: transform 0.2s;
    }

    .arrow-up {
        transform: rotate(180deg);
    }

    .arrow-down {
        transform: rotate(0);
    }
</style>
