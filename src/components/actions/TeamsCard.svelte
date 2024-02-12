<script lang="ts">
  import type { School } from '$models/features/school.model'
  import EditTeamModal from '$components/modals/EditTeamModal.svelte'
  import type { PageData } from '../../routes/admin/$types'
  import AddTeamModal from '$components/modals/AddTeamModal.svelte'

  export let data: PageData

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

  let showAddModal = false
  let showEditModal = false
  let editTeamId: number
</script>

<div class="card">
  <button class="primary add" on:click={() => (showAddModal = true)}><i class="fa-solid fa-plus" /></button>
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
      {#each data.teams as team, i}
        <tr>
          <td>{team.name}</td>
          <td>
            {map.short[data.schools.find((school) => school.id === team.school)?.category || 'C']}
            {(data.schools.find((school) => school.id === team.school) || data.schools[0]).name}
          </td>
          <td>
            <button
              class="secondary"
              on:click={() => {
                editTeamId = i
                showEditModal = true
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

<EditTeamModal bind:show={showEditModal} bind:data team={data.teams[editTeamId]} />
<AddTeamModal bind:show={showAddModal} bind:data />

<style lang="scss">
  @import url('/assets/sass/cards.scss');

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
