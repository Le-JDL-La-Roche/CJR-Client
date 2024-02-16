<script lang="ts">
  import ModalTemplate from './ModalTemplate.svelte'
  import ApiSchoolsService from '$services/api/api-schools.service'
  import type { School } from '$models/features/school.model'
  import type { PageData } from '../../routes/admin/$types'
  import ApiAgendaService from '$services/api/api-agenda.service'
  import type { Event } from '$models/features/event.model'

  export let show: boolean
  export let data: PageData
  export let event: Event | undefined

  const apiAgenda = new ApiAgendaService()

  let title: string
  let content: string
  let fromDate: string
  let toDate: string | undefined
  let field: number
  let category: 'C' | 'L' | 'g'
  let status: boolean

  let error: string

  $: if (show) update()

  $: e = { title, content, fromDate, toDate, field, category, status: status ? 0 : 1 } as Event

  $: if (field === 0) {
    toDate = ''
    category = 'g'
  }

  function update() {
    error = ''
    if (event) {
      title = event.title
      content = event.content
      fromDate = event.fromDate
      toDate = event.toDate
      field = event.field
      category = event.category
      status = event.status === 0
    } else {
      title = ''
      content = ''
      fromDate = ''
      toDate = ''
      field = 0
      category = 'g'
      status = false
    }
  }

  async function submit() {
    const exec = event ? apiAgenda.putEvent : apiAgenda.postEvent
    ;(await exec(e, event ? event.id! : 0)).subscribe({
      next: (res) => {
        data.events = res.body.data!.events
        show = false
      },
      error: (err) => {
        error = err.body.message
      }
    })
  }

  async function del() {
    if (confirm('Voulez-vous supprimer cet évènement ?')) {
      ;(await apiAgenda.deleteEvent(event!.id!)).subscribe({
        next: (res) => {
          data.events = res.body.data!.events
          show = false
        },
        error: (err) => {
          error = err.body.message
        }
      })
    }
  }
</script>

<ModalTemplate size={'m'} bind:show>
  <form on:submit|preventDefault={submit}>
    <h4>{event ? "Modifier l'évènement" : 'Crée un évènement'}</h4>

    <label for="category">Titre :</label>
    <input type="text" bind:value={title} maxlength="25" />

    <label for="name">Description :</label>
    <textarea bind:value={content} maxlength="200" />

    <label for="category">Évènement collège/lycée/commun :</label>
    <select id="category" bind:value={category} disabled={field === 0}>
      <option value="C">Collège</option>
      <option value="L">Lycée</option>
      <option value="g">Commun</option>
    </select>

    <div class="date">
      <div class="field">
        <label for="field">Terrain :</label>
        <select bind:value={field} id="field">
          <option value={0}>Tous/Aucun (évènement global)</option>
          <option value={1}>Terrain 1</option>
          <option value={2}>Terrain 2</option>
          <option value={3}>Terrain 3</option>
          <option value={4}>Terrain 4</option>
        </select>
      </div>

      <div class="from-date">
        <label for="from-date">{field === 0 ? 'Date et heure' : 'Date et heure de début'} :</label>
        <input type="datetime-local" id="from-date" bind:value={fromDate} />
      </div>

      {#if field !== 0}
        <div class="to-date">
          <label for="to-date">Date et heure de fin :</label>
          <input type="datetime-local" id="to-date" bind:value={toDate} />
        </div>
      {/if}
    </div>

    <label for="private">
      <input type="checkbox" id="private" bind:checked={status} />&nbsp;&nbsp;Évènement privé
    </label>

    <p class="error">{error}</p>

    <div class="actions">
      {#if event}
        <button class="secondary" on:click={del} type="button">Supprimer</button>
      {/if}
      <button class="primary">{event ? 'Modifier' : 'Créer'}</button>
    </div>
  </form>
</ModalTemplate>

<style lang="scss">
  @use '../../../static/assets/sass/modal.scss';

  div.date {
    display: flex;
    justify-content: space-between;
    gap: 20px;

    div.from-date,
    div.to-date,
    div.field {
      flex: 1;
    }
  }

  textarea {
    min-width: calc(100% - 30px);
    max-width: calc(100% - 30px);
    min-height: 16px;
    max-height: 64px;
  }

  div.actions {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-top: 30px;

    button {
      flex: 1;
      margin-top: 0px;

      &.secondary {
        background: #5c3939;

        &:hover {
          background: #5c3b39;
        }
      }
    }
  }
</style>
