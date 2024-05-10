<script lang="ts">
  import ModalTemplate from './ModalTemplate.svelte'
  import type { PageData } from '../../routes/(main)/admin/$types'
  import ApiMatchesService from '$services/api/api-matches.service'
  import type { Match } from '$models/features/match.model'
  import utils from '$services/utils'

  export let show: boolean
  export let data: PageData
  export let match: Match | undefined
  export let allowChangeTeams: boolean = false
  export let category: 'C' | 'L'
  export let tree: string

  const apiMatches = new ApiMatchesService()

  let team1: number
  let team2: number
  let score1: number | undefined
  let score2: number | undefined
  let fromDate: string
  let toDate: string
  let field: number

  let error: string
  let block: boolean

  $: if (show) update()

  $: m = {
    team1,
    team2,
    score1,
    score2,
    fromDate,
    toDate,
    category,
    field,
    tree
  } as Match

  function update() {
    error = ''
    block = false
    if (match) {
      team1 = match.team1
      team2 = match.team2
      score1 = match.score1
      score2 = match.score2
      fromDate = match.fromDate
      toDate = match.toDate
      field = match.field
      block = match && (match.score1 || match.score2) ? true : false
    } else {
      // const match1 = data.matches.find(
      //   (m_) => m_.tree === ((+tree || 4) - 4) * 2 && m_.category === (category || 'C') && (m_.score1 || m_.score2)
      // )
      // const match2 = data.matches.find(
      //   (m_) => m_.tree === ((tree || 4) - 3) * 2 && m_.category === (category || 'C') && (m_.score1 || m_.score2)
      // )
      // team1 =
      //   match1 && (match1.score1 || 0) > (match1.score2 || 0)
      //     ? match1.team1
      //     : match1 && (match1.score1 || 0) < (match1.score2 || 0)
      //     ? match1.team2
      //     : 0
      // team2 =
      //   match2 && (match2.score1 || 0) > (match2.score2 || 0)
      //     ? match2.team1
      //     : match2 && (match2.score1 || 0) < (match2.score2 || 0)
      //     ? match2.team2
      //     : 0
      team1 = data.schools.filter(s => s.category === category)[+tree.split('-')[0]].id || 0
      team2 = data.schools.filter(s => s.category === category)[+tree.split('-')[1]].id || 0
      score1 = 0
      score2 = 0
      fromDate = ''
      toDate = ''
      field = 0
    }
  }

  async function submit() {
    const c = 'Vous avez entré un score final.\nCela empêchera toute modification future du match, incluant sa suppression.'
    if ((score1 || score2) && !confirm(c)) return
    const exec = match ? apiMatches.putMatch : apiMatches.postMatch
    ;(await exec(m, match ? match.id! : 0)).subscribe({
      next: (res) => {
        data.matches = res.body.data!.matches
        show = false
      },
      error: (err) => {
        error = err.body.message
      }
    })
  }

  async function del() {
    if (confirm('Voulez-vous supprimer ce match ?')) {
      ;(await apiMatches.deleteMatch(match!.id!)).subscribe({
        next: (res) => {
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
    <h4>
      {match ? (match.score1 || match.score2 ? 'Information du match' : 'Modifier le match') : 'Programmer un match'} (tournoi {utils
        .map.long[category]})
    </h4>

    <div class="teams">
      <select bind:value={team1} disabled={!allowChangeTeams || block} style="display: inline; width: 357px">
        <option value={0} disabled>-- Sélectionner --</option>
        {#each data.schools as team}
          {#if team.category === category}
            <option value={team.id}>
              {utils.map.short[category]} {team.name}
            </option>
          {/if}
        {/each}
      </select>
      <p>vs.</p>
      <select bind:value={team2} disabled={!allowChangeTeams || block} style="display: inline; width: 356px">
        <option value={0} disabled>-- Sélectionner --</option>
        {#each data.schools as team}
          {#if team.category === category && team.id !== team1}
            <option value={team.id}>
              {utils.map.short[category]} {team.name}
            </option>
          {/if}
        {/each}
      </select>
    </div>

    <div class="date">
      <div class="from-date">
        <label for="from-date">Date et heure de début :</label>
        <input type="datetime-local" id="from-date" bind:value={fromDate} disabled={block} />
      </div>

      <div class="to-date">
        <label for="to-date">Date et heure de fin :</label>
        <input type="datetime-local" id="to-date" bind:value={toDate} disabled={block} />
      </div>

      <div class="field">
        <label for="field">Terrain :</label>
        <select id="field" bind:value={field} disabled={block}>
          <option value={0} disabled>-- Sélectionner --</option>
          <option value={1} title="Seul ce terrain est filmé est diffusé.">Terrain 1</option>
          <option value={2}>Terrain 2</option>
          <option value={3}>Terrain 3</option>
          <option value={4}>Terrain 4</option>
        </select>
      </div>
    </div>

    <label for="score1">Score final :</label><br />
    {#if !block}
      <small><b>Attention !</b> Entrer un score final empêchera toute modification future du match.</small>
    {/if}
    <div class="score">
      <input
        type="number"
        id="score1"
        bind:value={score1}
        min={0}
        max={100}
        disabled={block}
        style="margin-bottom: {block ? '0' : 'auto'}"
      />
      <p>—</p>
      <input
        type="number"
        id="score2"
        bind:value={score2}
        min={0}
        max={100}
        disabled={block}
        style="margin-bottom: {block ? '0' : 'auto'}"
      />
    </div>

    <p class="error">{error}</p>

    {#if !block}
      <div class="actions">
        {#if match}
          <button class="secondary" type="button" on:click={del}>Supprimer</button>
        {/if}
        <button class="primary">{match ? 'Sauvegarder' : 'Programmer'}</button>
      </div>
    {/if}
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
