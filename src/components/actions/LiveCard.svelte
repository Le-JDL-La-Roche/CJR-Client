<script lang="ts">
  import type { PageData } from '../../routes/(main)/admin/$types'
  import AddEditSchoolModal from '$components/modals/AddEditSchoolModal.svelte'
  import type { Live } from '$models/features/live.model'
  import AddEditLiveModal from '$components/modals/AddEditLiveModal.svelte'

  export let data: PageData

  let showModal = false
  let l: Live | undefined = undefined
</script>

<div class="card">
  <button
    class="primary add"
    on:click={() => {
      l = undefined
      showModal = true
    }}><i class="fa-solid fa-plus" /></button
  >
  <h4>Directs et Replays</h4>

  <table>
    <thead>
      <tr>
        <th style="width: calc(385px / 2 + 62px)">Titre</th>
        <th style="width: 100px">Date</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {#each data.lives as live}
        <tr class:l={live.status === 'l'} class:r={live.status === 'r'}>
          <td>{live.title}</td>
          <td>
            {new Date(live.date).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </td>
          <td>
            <button
              class="secondary"
              on:click={() => {
                l = live
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

<AddEditLiveModal bind:show={showModal} bind:data live={l} />

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
      width: calc(385px / 2 + 62px);
    }

    tr td:nth-of-type(2) {
      width: 100px;
      text-align: center;
    }
  }

  tr.l {
    animation: live 1s infinite;
  }

  tr.r {
    opacity: 0.5
  }

  @keyframes live {
    0% {
      background: #ac222d00;
    }
    50% {
      background: #71151c50;
    }
    100% {
      background: #ac222d00;
    }
  }
</style>
