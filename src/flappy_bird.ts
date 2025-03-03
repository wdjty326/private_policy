import { mount } from 'svelte'
import './app.css'
// @ts-ignore
import FlappyBirdApp from './flappy_bird/flappy_bird_app.svelte'

const app = mount(FlappyBirdApp, {
  target: document.getElementById('app')!,
})

export default app
