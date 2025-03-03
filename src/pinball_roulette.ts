import { mount } from 'svelte'
import './app.css'
// @ts-ignore
import PinballRouletteApp from './pinball_roulette/pinball_roulette_app.svelte'

const app = mount(PinballRouletteApp, {
  target: document.getElementById('app')!,
})

export default app
