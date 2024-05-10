<script lang="ts">
  import { onMount } from 'svelte'
  import * as d3 from 'd3'
  import type { Selection, BaseType, ZoomedElementBaseType, D3ZoomEvent } from 'd3'
  import type { PageData } from '../../routes/(main)/admin/$types'
  import type { Match } from '$models/features/match.model'
  import AddEditMatchModal from '$components/modals/AddEditMatchModal.svelte'

  export let data: PageData

  let showModal = false
  let allowChangeTeams = false
  let tree: string
  let category: 'C' | 'L' = 'C'
  let m: Match | undefined = undefined

  function toggle(to: 'C' | 'L') {
    if (to === 'C') category = 'C'
    else category = 'L'
  }
</script>

<div class="card" style="height: auto">
  <div class="toggle">
    <h4>Tournoi</h4>
    <button class:primary={category === 'C'} class:secondary={category === 'L'} on:click={() => toggle('C')}>Collège</button>
    <button class:primary={category === 'L'} class:secondary={category === 'C'} on:click={() => toggle('L')}>Lycée</button>
  </div>

  {#each ['C', 'L'] as cat}
    <div id="tournament-{cat}" style="display: {category === cat ? 'block' : 'none'}">
      <table class="default">
        <thead>
          <tr>
            <th />
            {#each data.schools.filter((s) => s.category === cat) as team}
              <th>{team.name}</th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each data.schools.filter((s) => s.category === cat) as team1, i}
            <tr>
              <th>{team1.name}</th>
              {#each data.schools.filter((s) => s.category === cat) as team2, j}
                {#if i <= j}
                  <td class="disabled" />
                {:else}
                  <td
                    id="match-{i}-{j}"
                    on:click={() => {
                      let match = data.matches.find((m) => m.team1 === team1.id && m.team2 === team2.id && m.category === cat)
                      if (match) {
                        tree = match.tree
                        m = match
                        showModal = true
                      } else {
                        tree = `${i}-${j}`
                        m = undefined
                        showModal = true
                      }
                    }}
                  >
                    {#each data.matches.filter((m) => m.team1 === team1.id && m.team2 === team2.id && m.category === cat) as match}
                    {#if match.score1 !== 0 || match.score2 !== 0}
                      <p style="font-size: {(match.score1 || 0) > (match.score2 || 0) ? '20px' : '15px'}">{match.score1}</p>
                      <p style="font-size: {(match.score1 || 0) < (match.score2 || 0) ? '20px' : '15px'}">{match.score2}</p>
                      {/if}
                    {/each}
                  </td>
                {/if}
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/each}
</div>

<AddEditMatchModal bind:show={showModal} bind:data {allowChangeTeams} {category} {tree} match={m} />

<style lang="scss">
  @use '../../../static/assets/sass/cards.scss';

  h4 {
    display: inline-block;
    margin-top: 3px;
    margin-bottom: 0;
    margin-right: 30px;
  }

  div.toggle {
    display: flex;
    margin-bottom: 30px;
    height: 40px;

    button {
      width: 100px;
      margin: 0;
      font-weight: bold;

      &.secondary {
        padding: 5px 0 !important;
        margin: 3px 0;
      }
    }
  }

  table {
    border-collapse: collapse;
    width: 100%;
    table-layout: fixed;

    th,
    td {
      padding: 10px 15px;
      text-align: left;
      height: 50px;
      border: 1px solid #1c1c25;
    }

    th {
      text-align: center;
      background: #1c1c25;
      width: auto;
    }

    td.disabled {
      background: #18181f;
    }

    td {
      position: relative;
      background-image: linear-gradient(to top right, #15151c calc(50% - 1px), #1c1c25, #15151c calc(50% + 1px));

      &:not(.disabled) {
        cursor: pointer;
      }

      p {
        font-weight: bold;
        position: absolute;
        margin: 0;

        &:nth-of-type(1) {
          bottom: 8px;
          left: calc(100% / 4 - 5px);
        }

        &:nth-of-type(2) {
          text-align: right;
          top: 8px;
          right: calc(100% / 4 - 5px);
        }
      }
    }
  }
</style>
