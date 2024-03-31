<script lang="ts">
  import Hls from 'hls.js'
  import { onMount } from 'svelte'

  export let stream: string
  export let title: string

  let video: HTMLVideoElement
  
  onMount(async () => {
    /**
     * This is NOT a secret key, it is only the ID of the stream.
     */
    const key = await fetch('https://stream.cjr.le-jdl-laroche.cf/key').then((res) => res.text())

    if (Hls.isSupported()) {
      const hls = new Hls()

      hls.on(Hls.Events.MEDIA_ATTACHED, () => console.log('video and hls.js are now bound together !'))
      hls.on(Hls.Events.MANIFEST_PARSED, (event, data) =>
        console.log('manifest loaded, found ' + data.levels.length + ' quality level')
      )
      hls.loadSource(`https://stream.cjr.le-jdl-laroche.cf/hls/${stream}/${key}/index.m3u8`)
      hls.attachMedia(video)
      video.play()
    }
  })
</script>

<p class="title">{title}</p>

<!-- svelte-ignore a11y-media-has-caption -->
<video bind:this={video} controls muted />

<style lang="scss">
  p.title {
    position: absolute;
    top: 5px;
    left: 10px;
    margin: 0;
    color:white;
    text-shadow: 2px 2px 0 black, 1px 1px 0 black;
    z-index: 1000;
    font-weight: 700;
  }

  video {
    width: calc(50vw - 2px);
    height: calc(9 / 16 * 50vw - 2px)
  }
</style>
