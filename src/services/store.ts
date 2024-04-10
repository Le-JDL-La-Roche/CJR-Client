import { writable } from 'svelte/store'
import { dev } from '$app/environment'

export let redirect$ = writable<string | null>(null)
export let showAcceptCookies$ = writable<boolean>(false)

export const api = dev ? 'http://172.16.38.18:5001' : 'https://api.cjr.le-jdl-laroche.cf'
