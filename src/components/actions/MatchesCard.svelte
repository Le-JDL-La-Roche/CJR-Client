<script lang="ts">
  import type { PageData } from '../../routes/admin/$types'
  import utils from '$services/utils'
  import type { Match } from '$models/features/match.model'
  import AddEditMatchModal from '$components/modals/AddEditMatchModal.svelte'

  export let data: PageData

  let allowChangeTeams = false
  let category: 'C' | 'L'
  let tree: number
  let showModal = false
  let m: Match | undefined = undefined
</script>

<div class="card" style="height: 400px">
  <!-- <button class="primary add"><i class="fa-solid fa-plus" /></button> -->
  <h4>Matchs</h4>

  <table>
    <thead>
      <tr>
        <th style="width: 790px" colspan="3">Match</th>
        <th style="width: 100px">Date</th>
        <th style="width: 50px">Terrain</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {#each data.matches as match}
        <tr style={match.score1 || match.score2 ? 'opacity: 0.5' : ''}>
          <td>
            {data.teams.find((team) => team.id === match.team1)?.name}
            ({utils.map.short[
              data.schools.find((school) => school.id === data.teams.find((team) => team.id === match.team1)?.school)?.category ||
                'C'
            ]}
            {data.schools.find((school) => school.id === data.teams.find((team) => team.id === match.team1)?.school)?.name})
          </td>
          <td>–</td>
          <td>
            {data.teams.find((team) => team.id === match.team2)?.name}
            ({utils.map.short[
              data.schools.find((school) => school.id === data.teams.find((team) => team.id === match.team2)?.school)?.category ||
                'C'
            ]}
            {data.schools.find((school) => school.id === data.teams.find((team) => team.id === match.team2)?.school)?.name})
          </td>
          <td>
            {new Date(match.fromDate).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </td>
          <td>{match.field}</td>
          <td>
            <button
              class="secondary"
              on:click={() => {
                tree = match.tree
                category = match.category
                m = match
                if (tree < 16) allowChangeTeams = true
                else allowChangeTeams = false
                showModal = true
              }}
            >
              {#if match.score1 || match.score2}
                <i class="fa-solid fa-circle-info" />
              {:else}
                <i class="fa-solid fa-gear" />
              {/if}
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<AddEditMatchModal bind:show={showModal} bind:data {allowChangeTeams} {category} {tree} match={m} />

<style lang="scss">
  @use '../../../static/assets/sass/cards.scss';

  table {
    tbody {
      max-height: calc(400px - 31px - 35px - 40px);
      overflow: auto;
      display: block;
      width: 100%;
    }

    tr td:nth-of-type(1),
    tr td:nth-of-type(3) {
      width: calc(730px / 2) - 3px;
    }

    tr td:nth-of-type(1) {
      text-align: right;
    }

    tr td:nth-of-type(2) {
      width: 6px;
    }

    tr td:nth-of-type(4) {
      width: 100px;
      text-align: center;
    }

    tr td:nth-of-type(5) {
      width: 50px;
      text-align: center;
    }
  }
</style>
