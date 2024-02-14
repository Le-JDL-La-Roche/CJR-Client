<script lang="ts">
  import EditSchoolModal from '$components/modals/EditSchoolModal.svelte'
  import type { PageData } from '../../routes/admin/$types'
  import AddSchoolModal from '$components/modals/AddSchoolModal.svelte'

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
  let editSchoolId: number
</script>

<div class="card">
  <button class="primary add" on:click={() => (showAddModal = true)}><i class="fa-solid fa-plus" /></button>
  <h4>Écoles</h4>

  <table>
    <thead>
      <tr>
        <th style="width: 385px">Nom</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {#each data.schools as school, i}
        <tr>
          <td>{map.long[school.category]} {school.name}</td>
          <td>
            <button
              class="secondary"
              on:click={() => {
                editSchoolId = i
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

<EditSchoolModal bind:show={showEditModal} bind:data school={data.schools[editSchoolId]} />
<AddSchoolModal bind:show={showAddModal} bind:data />

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
      width: 385px;
    }
  }
</style>
