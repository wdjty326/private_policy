import { writable } from 'svelte/store'

export const termsAtom = writable<string>('20250303')
export const setTerms = (terms: string) => {
    termsAtom.set(terms)
}

export const languageAtom = writable<string>('en')
export const setLanguage = (language: string) => {
    languageAtom.set(language)
}

