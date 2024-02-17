<script lang="ts">
  import type { PageData } from '../../routes/(main)/admin/$types'
  import type { School } from '$models/features/school.model'
  import AddEditSchoolModal from '$components/modals/AddEditSchoolModal.svelte'
  import utils from '$services/utils'

  export let data: PageData

  let showModal = false
  let s: School | undefined = undefined
</script>

<div class="card">
  <button
    class="primary add"
    on:click={() => {
      s = undefined
      showModal = true
    }}><i class="fa-solid fa-plus" /></button
  >
  <h4>Écoles</h4>

  <table>
    <thead>
      <tr>
        <th style="width: 385px">Nom</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {#each data.schools as school}
        <tr>
          <td>{utils.map.long[school.category]} {school.name}</td>
          <td>
            <button
              class="secondary"
              on:click={() => {
                s = school
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

<AddEditSchoolModal bind:show={showModal} bind:data school={s} />

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
