<script lang="ts">
  import ModalTemplate from './ModalTemplate.svelte'
  import type { PageData } from '../../routes/admin/$types'
  import ApiTeamsService from '$services/api/api-teams.service'
  import type { Team, Teammate } from '$models/features/team.model'
  import utils from '$services/utils'

  export let show: boolean
  export let data: PageData
  export let team: Team | undefined

  const apiTeams = new ApiTeamsService()

  let name: string
  let school: number
  let teammates: Teammate[]

  let teammatesLength: number
  let error: string

  $: if (show) update()

  $: t = { school, name, teammates } as Team

  function update() {
    error = ''
    if (team) {
      name = team.name
      school = team.school
      teammates = team.teammates
      teammatesLength = team.teammates.length
    } else {
      name = ''
      school = 0
      teammates = []
      teammatesLength = 7
      updateTeammates()
    }
  }

  function updateTeammates() {
    if (teammatesLength > teammates.length) {
      for (let i = teammates.length; i < teammatesLength; i++) {
        teammates.push({ name: '', captain: i === 0, substitute: false, imageId: '' })
      }
    } else {
      while (teammatesLength < teammates.length) {
        teammates.pop()
      }
    }
    teammates = teammates
  }

  async function submit() {
    const exec = team ? apiTeams.putTeam : apiTeams.postTeam
    ;(await exec(t, team ? team.id! : 0)).subscribe({
      next: (res) => {
        data.teams = res.body.data?.teams || []
        show = false
      },
      error: (err) => {
        error = err.body.message
      }
    })
  }

  async function del() {
    if (confirm('Voulez-vous supprimer cette équipe ?\nLes matchs associés seront également supprimés.')) {
      ;(await apiTeams.deleteTeam(team!.id!)).subscribe({
        next: (res) => {
          data.teams = res.body.data!.teams
          data.matches = res.body.data!.matches
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
    <h4>{team ? "Modifier l'équipe" : 'Ajouter une équipe'}</h4>

    <label for="school">École :</label>
    <select name="school" bind:value={school}>
      <option value={0} disabled>-- Sélectionner --</option>
      <optgroup label="Collèges" style="background: #46464a; color: #c0c0c4">
        {#each data.schools.filter((s) => s.category === 'C') as school}
          <option value={school.id}>{utils.map.long[school.category]} {school.name}</option>
        {/each}
      </optgroup>
      <optgroup label="Lycées" style="background: #46464a; color: #c0c0c4">
        {#each data.schools.filter((s) => s.category === 'L') as school}
          <option value={school.id}>{utils.map.long[school.category]} {school.name}</option>
        {/each}
      </optgroup>
    </select>

    <label for="name">Nom de l'équipe :</label>
    <input type="text" bind:value={name} />

    <label for="teammates">
      Équipiers :&nbsp;&nbsp;
      <input
        type="number"
        min="5"
        max="20"
        bind:value={teammatesLength}
        on:click={updateTeammates}
        style="display: inline; width: 35px; margin-bottom: 10px;"
      />
    </label>
    {#each teammates as teammate, i}
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
      {#if team}
        <button class="secondary" type="button" on:click={del}>Supprimer</button>
      {/if}
      <button class="primary">{team ? 'Sauvegarder' : 'Ajouter '}</button>
    </div>
  </form>
</ModalTemplate>

<style lang="scss">
  @use '../../../static/assets/sass/modal.scss';

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
