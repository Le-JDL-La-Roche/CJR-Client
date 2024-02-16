<script lang="ts">
  import type { PageData } from '../../routes/admin/$types'
  import utils from '$services/utils'
  import AddEditTeamModal from '$components/modals/AddEditTeamModal.svelte'
  import type { Team } from '$models/features/team.model'

  export let data: PageData

  let showModal = false
  let t: Team | undefined = undefined
</script>

<div class="card">
  <button class="primary add" on:click={() => {t = undefined; showModal = true}}><i class="fa-solid fa-plus" /></button>
  <h4>Équipes</h4>

  <table>
    <thead>
      <tr>
        <th style="width: calc(385px / 2 - 80px)">Nom</th>
        <th style="width: 242px">École</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {#each data.teams as team}
        <tr>
          <td>{team.name}</td>
          <td>
            {utils.map.short[data.schools.find((school) => school.id === team.school)?.category || 'C']}
            {(data.schools.find((school) => school.id === team.school) || data.schools[0]).name}
          </td>
          <td>
            <button
              class="secondary"
              on:click={() => {
                t = team
                showModal = true
              }}
            >
              <i class="fa-solid fa-gear" />
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<AddEditTeamModal bind:show={showModal} bind:data team={t} />

<style lang="scss">
  @use '../../../static/assets/sass/cards.scss';

  table {
    tbody {
      max-height: calc(300px - 31px - 35px - 40px);
      overflow: auto;
      display: block;
      width: 100%;
    }

    tr td:nth-of-type(1) {
      width: calc(385px / 2 - 80px);
    }
    tr td:nth-of-type(2) {
      width: calc(385px / 2 + 50px);
    }
  }
</style>
