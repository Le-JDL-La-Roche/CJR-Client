<script lang="ts">
  import ModalTemplate from './ModalTemplate.svelte'
  import type { PageData } from '../../routes/admin/$types'
  import ApiTeamsService from '$services/api/api-teams.service'
  import type { Team } from '$models/features/team.model'

  export let show: boolean
  export let data: PageData

  const d = data

  const apiTeams = new ApiTeamsService()

  const map = {
    short: {
      C: 'COL',
      L: 'LYC'
    },
    long: {
      C: 'Collège',
      L: 'Lycée'
    }
  }

  let error = ''

  let team: Team = {
    school: 0,
    name: '',
    teammates: []
  }

  let teammatesLength = 7

  $: if (show) {
    error = ''
    team = {
      school: 0,
      name: '',
      teammates: []
    }
    teammatesLength = 7
  }

  $: if (teammatesLength) {
    if (teammatesLength > team.teammates.length) {
      for (let i = team.teammates.length; i < teammatesLength; i++) {
        team.teammates.push({ name: '', captain: i === 0, substitute: false, imageId: '' })
      }
    } else {
      while (teammatesLength < team.teammates.length) {
        team.teammates.pop()
      }
    }
    team.teammates = team.teammates
  }

  async function submit() {
    ;(await apiTeams.postTeam(team)).subscribe({
      next: (res) => {
        data.teams = res.body.data?.teams || []
        data.teams.forEach((team, i) => {
          data.teams[i].teammates = JSON.parse(team.teammates as unknown as string)
        })
        show = false
      },
      error: (err) => {
        error = err.body.message
      }
    })
  }
</script>

<ModalTemplate size={'m'} bind:show>
  <form on:submit|preventDefault={submit}>
    <h4>Ajouter une équipe</h4>

    <label for="school">École :</label>
    <select name="school" bind:value={team.school}>
      <option value={0} disabled>-- Sélectionner --</option>
      <optgroup label="Collèges" style="background: #46464a; color: #c0c0c4">
        {#each d.schools.filter((s) => s.category === 'C') as school}
          <option value={school.id}>{map.long[school.category]} {school.name}</option>
        {/each}
      </optgroup>
      <optgroup label="Lycées" style="background: #46464a; color: #c0c0c4">
        {#each d.schools.filter((s) => s.category === 'L') as school}
          <option value={school.id}>{map.long[school.category]} {school.name}</option>
        {/each}
      </optgroup>
    </select>

    <label for="name">Nom de l'équipe :</label>
    <input type="text" bind:value={team.name} />

    <label for="teammates">
      Équipiers :&nbsp;&nbsp;
      <input
        type="number"
        min="5"
        max="20"
        bind:value={teammatesLength}
        style="display: inline; width: 35px; margin-bottom: 10px;"
      />
    </label>
    {#each team.teammates as teammate, i}
      <div class="teammate">
        <input
          style="display: inline; width: 350px; margin-right: 20px; margin-bottom: 10px;"
          type="text"
          bind:value={teammate.name}
          placeholder="Nom"
        />

        <input
          style="display: inline; width: 160px; margin-right: 20px; margin-bottom: 10px; cursor: help"
          type="text"
          bind:value={teammate.imageId}
          placeholder="Photo"
          title="Héberger cette photo sur Imgur et coller le lien de l'image ici."
        />

        {#if i === 0}
          <label for="teammate-{i}-captain" style="margin-right: 20px;">
            <input type="checkbox" bind:checked={teammate.captain} disabled id="teammate-{i}-captain" />&nbsp;&nbsp;Capitaine
          </label>
        {:else}
          <label for="teammate-{i}-substitute">
            <input
              type="checkbox"
              bind:checked={teammate.substitute}
              disabled={teammate.captain}
              id="teammate-{i}-substitute"
            />&nbsp;&nbsp;Remplaçant
          </label>
        {/if}
      </div>
    {/each}

    <p class="error">{error}</p>

    <div class="actions">
      <button class="primary">Ajouter</button>
    </div>
  </form>
</ModalTemplate>

<style lang="scss">
  @use '../../../static/assets/sass/modal.scss';

  input:disabled {
    cursor: not-allowed;
  }
</style>
