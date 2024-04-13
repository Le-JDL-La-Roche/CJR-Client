<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
</script>

<svelte:head>
  <title>Replays • Coupe Jules Rimet</title>
</svelte:head>

<div class="content">
  <h2>Directs et Replays</h2>

  {#if data.lives.find((live) => live.status === 'l')}
    <h3><span>En direct :</span> {data.lives.find((live) => live.status === 'l')?.title}</h3>
    <iframe
      class="live"
      src="https://www.youtube.com/embed/{data.lives.find((live) => live.status === 'l')?.url}"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    />
  {:else}
    <h3>Aucun direct en cours</h3>
  {/if}

  <h3>Replays</h3>
  <div class="replays">
    {#each data.lives.filter((live) => live.status === 'r') as live}
      <figure>
        <iframe
          class="replay"
          src="https://www.youtube.com/embed/{live.url}"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        />
        <figcaption>
          {live.title}<br />
          <span>{new Date(live.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
        </figcaption>
      </figure>
    {:else}
      <p style="margin: 0">Aucun replay disponible</p>
    {/each}
  </div>
</div>

<style lang="scss">
  h3 {
    margin-top: 26px;
    font-size: 20px;

    span {
      color: #ccc;
    }
  }

  div.replays {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    align-items: flex-start;
  }

  iframe.live {
    width: 100%;
    height: calc(9 / 16 * 1200px);
    border-radius: 3px;
  }

  figure {
    margin: 0 0 10px 0;

    figcaption {
      margin-top: 10px;
      font-size: 14px;
      line-height: 1.3;
      font-weight: 500;

      span {
        font-size: 12px;
        color: #ccc;
        font-weight: 400;
      }
    }
  }

  iframe.replay {
    width: calc(1200px / 3 - 13.4px);
    height: calc(9 / 16 * (1200px / 3 - 13.4px));
    border-radius: 3px;
  }

  @media screen and (max-width: 1240px) {
    iframe.replay {
      width: calc(100vw / 3 - 26.8px);
      height: calc(9 / 16 * (100vw / 3 - 26.8px));
      border-radius: 3px;
    }
  }

  @media screen and (max-width: 950px) {
    iframe.replay {
      width: calc(100vw / 2 - 30px);
      height: calc(9 / 16 * (100vw / 2 - 30px));
      border-radius: 3px;
    }
  }

  @media screen and (max-width: 600px) {
    iframe.replay {
      width: calc(100vw - 40px);
      height: calc(9 / 16 * (100vw - 40px));
      border-radius: 3px;
    }
  }
</style>
