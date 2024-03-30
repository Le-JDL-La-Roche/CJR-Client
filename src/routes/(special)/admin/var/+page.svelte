<script lang="ts">
  import { goto, invalidateAll } from '$app/navigation'
  import HlsVideo from '$components/management/HlsVideo.svelte'
  import { onMount } from 'svelte'
  import type { PageData } from './$types'

  export let data: PageData

  let key: string = ''

  onMount(async () => {
    /**
     * This is NOT a secret key, it is only the ID of the stream.
     */
    key = await fetch('https://stream.cjr.le-jdl-laroche.cf/key').then((res) => res.text())
  })

  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      goto('/admin')
    }
  })
</script>

<svelte:head>
  <title>VAR • Coupe Jules Rimet</title>
</svelte:head>

<svelte:document
  on:keypress={(e) => {
    if (e.key === 'Escape') {
      document.exitFullscreen()
    }
  }}
  on:click={() => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen()
  }}
/>

<div class="var">
  <div>
    <h2><button
      class="secondary back"
      on:click={() => {
        if (document.fullscreenElement) document.exitFullscreen()
        else goto('/admin')
      }}><i class="fa-solid fa-arrow-left" />&nbsp;&nbsp;[Esc] Retour</button
    >&nbsp;&nbsp;&nbsp;VAR</h2>
    <p><i class="fa-solid fa-triangle-exclamation" />&nbsp;&nbsp;Attention au délai de 20 secondes !</p>
    
    <p style="font-size: 12px;">
      <b>Impossible de lire les directs ?</b><br />
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <!-- svelte-ignore a11y-missing-attribute -->
      &nbsp;&nbsp;1. Essayer de <a href="/admin/var" on:click={() => window.location.reload()}>recharger la page</a> ;<br />
      &nbsp;&nbsp;2. Utiliser VLC media player en ouvrant un flux réseau.
    </p>
    <p style="font-size: 12px; color: #f0f0f0">
      Flux réseaux (au choix) :<br />
      <code style="font-family: Consolas, mono; color: #f0f0f0">
        &nbsp;&nbsp;https://stream.cjr.le-jdl-laroche.cf/hls/{data.ter1}/{key}/index.m3u8<br />
        &nbsp;&nbsp;https://stream.cjr.le-jdl-laroche.cf/hls/{data.ter2}/{key}/index.m3u8<br />
        &nbsp;&nbsp;https://stream.cjr.le-jdl-laroche.cf/hls/{data.glob}/{key}/index.m3u8
      </code>
    </p>
  </div>
  <div>
    <HlsVideo stream={data.ter1} title="Caméra 1" />
  </div>
  <div>
    <HlsVideo stream={data.ter2} title="Caméra 2" />
  </div>
  <div>
    <HlsVideo stream={data.ter2} title="Caméra globale" />
  </div>
</div>

<style lang="scss">
  .var {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: black;

    div {
      position: relative;
    }

    div:nth-of-type(1) {
      padding: 20px 30px;
      border-bottom: 2px solid white;
      border-right: 2px solid white;
    }

    div:nth-of-type(2) {
      border-bottom: 2px solid white;
      border-left: 2px solid white;
    }

    div:nth-of-type(3) {
      border-top: 2px solid white;
      border-right: 2px solid white;
    }

    div:nth-of-type(4) {
      border-top: 2px solid white;
      border-left: 2px solid white;
    }
  }

  h2 {
    margin: 0;
  }

  button.secondary.back {
    display: inline;
    height: 40px;
    vertical-align: top;
  }

  code {
    display: block;
    filter: blur(3px);

    &:hover {
      filter: blur(0);
    }
  }
</style>
