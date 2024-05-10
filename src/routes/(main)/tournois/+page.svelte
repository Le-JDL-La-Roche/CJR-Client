<script lang="ts">
  import type { PageData } from './$types'
  import { onMount } from 'svelte'
  import * as d3 from 'd3'
  import type { Selection, BaseType, ZoomedElementBaseType, D3ZoomEvent } from 'd3'
  import type { Match } from '$models/features/match.model'

  export let data: PageData
</script>

<svelte:head>
  <title>Tournois • Coupe Jules Rimet</title>
</svelte:head>

<div class="content">
  <h2>Tournois</h2>

  {#each ['C', 'L'] as cat}
    <h3>Tournoi {cat === 'C' ? 'Collège' : 'Lycée'}</h3>
    <div class="tournament" id="tournament-{cat}">
      <table class="default" style="min-width: calc(180px * {data.schools.filter((s) => s.category === cat).length + 1})">
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
                  <td id="match-{i}-{j}">
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

<style lang="scss">
  h3 {
    margin-top: 26px;
    font-size: 20px;
  }

  div.tournament {
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
    border-radius: 3px;
    background-color: #1b1b25;
    overflow-x: auto;
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
      min-width: 100px !important;
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
