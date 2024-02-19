<script lang="ts">
  import ModalTemplate from './ModalTemplate.svelte'
  import type { Live } from '$models/features/live.model'
  import type { PageData } from '../../routes/(main)/admin/$types'
  import ApiLivesService from '$services/api/api-agenda.service copy'

  export let show: boolean
  export let data: PageData
  export let live: Live | undefined

  const apiLives = new ApiLivesService()

  let title: string
  let date: string
  let status: 's' | 'l' | 'r' | 0
  let url: string

  let error: string

  $: if (show) update()

  $: l = { title, date, status, url } as Live

  function update() {
    error = ''
    if (live) {
      title = live.title
      date = live.date
      status = live.status
      url = live.url
    } else {
      title = ''
      date = ''
      status = 0
      url = ''
    }
  }

  async function submit() {
    const exec = live ? apiLives.putLive : apiLives.postLive
    ;(await exec(l, live ? live.id! : 0)).subscribe({
      next: (res) => {
        data.lives = res.body.data!.lives
        show = false
      },
      error: (err) => {
        error = err.body.message
      }
    })
  }

  async function del() {
    if (confirm('Voulez-vous supprimer ce direct/replay ?')) {
      ;(await apiLives.deleteLive(live!.id!)).subscribe({
        next: (res) => {
          data.lives = res.body.data!.lives
          show = false
        },
        error: (err) => {
          error = err.body.message
        }
      })
    }
  }
</script>

<ModalTemplate size={'s'} bind:show>
  <form on:submit|preventDefault={submit}>
    <h4>{live ? "Modifier le live/replay" : 'Programmer un live'}</h4>

    <label for="title">Titre :</label>
    <input type="text" bind:value={title} maxlength="200"/>

    <label for="name">Date de diffusion :</label>
    <input type="datetime-local" bind:value={date}/>

    <label for="status">Statut :</label>
    <select bind:value={status}>
      <option value={0}>-- Sélectionner --</option>
      <option value="s">Programmé</option>
      <option value="l">Diffusion</option>
      <option value="r">Rediffusion</option>
    </select>

    <label for="url">ID YouTube :</label>
    <input type="text" bind:value={url} />
    
    <p class="error">{error}</p>

    <div class="actions">
      {#if live}
        <button class="secondary" type="button" on:click={del}>Supprimer</button>
      {/if}
      <button class="primary">{live ? 'Sauvegarder' : 'Programmer'}</button>
    </div>
  </form>
</ModalTemplate>

<style lang="scss">
  @use '../../../static/assets/sass/modal.scss';
</style>
