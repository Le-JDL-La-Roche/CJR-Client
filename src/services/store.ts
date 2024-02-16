import { writable } from 'svelte/store'
import { dev } from '$app/environment'

export let redirect$ = writable<string | null>(null)
export let showAcceptCookies$ = writable<boolean>(false)

export const api = dev ? 'http://localhost:5000' : 'https://api.cjr.le-jdl-laroche.cf'
