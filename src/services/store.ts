import { writable } from 'svelte/store'
import { dev } from '$app/environment'

export let redirect$ = writable<string | null>(null)
export let showAcceptCookies$ = writable<boolean>(false)

export const api = dev ? 'http://192.168.1.27:5001' : 'https://api.cjr.le-jdl-laroche.cf'
