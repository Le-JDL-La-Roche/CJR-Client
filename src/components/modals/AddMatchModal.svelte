<script lang="ts">
  import ModalTemplate from './ModalTemplate.svelte'
  import type { PageData } from '../../routes/admin/$types'
  import ApiMatchesService from '$services/api/api-matches.service'
  import type { Match } from '$models/features/match.model'

  export let show: boolean
  export let data: PageData
  export let allowChangeTeams: boolean = false
  export let category: 'C' | 'L' | undefined = undefined
  export let tree: number | undefined = undefined

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
  
  const d = data

  const apiMatches = new ApiMatchesService()

  let error = ''

  let match: Match = {
    team1: 0,
    team2: 0,
    score1: 0,
    score2: 0,
    category: category || 'C',
    fromDate: '',
    toDate: '',
    field: 0,
    tree: tree
  }

  $: if (show) {
    error = ''
    let match1 = d.matches.find(
      (match) => match.tree === ((tree || 16) - 16) * 2 && match.category === (category || 'C') && (match.score1 || match.score2)
    )
    let match2 = d.matches.find(
      (match) => match.tree === ((tree || 16) - 15) * 2 && match.category === (category || 'C') && (match.score1 || match.score2)
    )
    match = {
      team1:
        match1 && (match1.score1 || 0) > (match1.score2 || 0)
          ? match1.team1
          : match1 && (match1.score1 || 0) < (match1.score2 || 0)
          ? match1.team2
          : 0,
      team2:
        match2 && (match2.score1 || 0) > (match2.score2 || 0)
          ? match2.team1
          : match2 && (match2.score1 || 0) < (match2.score2 || 0)
          ? match2.team2
          : 0,
      score1: 0,
      score2: 0,
      category: category || 'C',
      fromDate: '',
      toDate: '',
      field: 0,
      tree: tree
    }
  }

  async function submit() {
    if (match.score1 || match.score2) {
      if (
        !confirm('Vous avez entré un score final.\nCela empêchera toute modification future du match, incluant sa suppression.')
      )
        return
    }
    ;(await apiMatches.postMatch(match)).subscribe({
      next: (res) => {
        data.matches = res.body.data?.matches || []
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
    <h4>Programmer un match</h4>

    <label for="category">Match collège/lycée :</label>
    <select id="category" bind:value={match.category} disabled={category !== undefined}>
      <option value="C">Collège</option>
      <option value="L">Lycée</option>
    </select>

    <div class="teams">
      <select bind:value={match.team1} disabled={!allowChangeTeams} style="display: inline; width: 357px">
        <option value={0} disabled>-- Sélectionner --</option>
        {#each d.teams as team}
          {#if d.schools.find((school) => school.id === team.school)?.category === match.category}
            <option value={team.id}>
              {team.name} ({map.short[match.category]} {(d.schools.find((school) => school.id === team.school) || d.schools[0]).name})
            </option>
          {/if}
        {/each}
      </select>
      <p>vs.</p>
      <select bind:value={match.team2} disabled={!allowChangeTeams} style="display: inline; width: 356px">
        <option value={0} disabled>-- Sélectionner --</option>
        {#each d.teams as team}
          {#if d.schools.find((school) => school.id === team.school)?.category === match.category && team.id !== match.team1}
            <option value={team.id}>
              {team.name} ({map.short[match.category]} {(d.schools.find((school) => school.id === team.school) || d.schools[0]).name})
            </option>
          {/if}
        {/each}
      </select>
    </div>

    <div class="date">
      <div class="from-date">
        <label for="from-date">Date et heure de début :</label>
        <input type="datetime-local" id="from-date" bind:value={match.fromDate} />
      </div>

      <div class="to-date">
        <label for="to-date">Date et heure de fin :</label>
        <input type="datetime-local" id="to-date" bind:value={match.toDate} />
      </div>

      <div class="field">
        <label for="field">Terrain :</label>
        <select id="field" bind:value={match.field}>
          <option value={0} disabled>-- Sélectionner --</option>
          <option value={1} title="Seul ce terrain est filmé est diffusé.">Terrain 1</option>
          <option value={2}>Terrain 2</option>
          <option value={3}>Terrain 3</option>
          <option value={4}>Terrain 4</option>
        </select>
      </div>
    </div>

    <label for="score1">Score final :</label><br />
    <small><b>Attention !</b> Entrer un score final empêchera toute modification future du match.</small>
    <div class="score">
      <input type="number" id="score1" bind:value={match.score1} min={0} max={100} />
      <p>—</p>
      <input type="number" id="score2" bind:value={match.score2} min={0} max={100} />
    </div>

    <p class="error">{error}</p>

    <div class="actions">
      <button class="primary">Programmer</button>
    </div>
  </form>
</ModalTemplate>

<style lang="scss">
  @use '../../../static/assets/sass/modal.scss';

  input:disabled {
    cursor: not-allowed;
  }

  div.teams {
    display: flex;
    justify-content: space-between;
    gap: 10px;

    p {
      margin-top: 10px;
      margin-bottom: 0;
    }
  }

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

  div.score {
    display: flex;
    gap: 10px;

    p {
      margin-top: 10px;
      margin-bottom: 0;
    }

    p,
    input {
      margin-bottom: 0;
    }
  }

  small {
    font-size: 11px;
    color: #ff6c6c;

    b {
      font-weight: 600;
      color: #ff6c6c;
    }
  }
</style>
