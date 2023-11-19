<script lang="ts">
  import type { PageData } from './$types'
  import SchoolsCard from '$components/actions/SchoolsCard.svelte'
  import TeamsCard from '$components/actions/TeamsCard.svelte'
  import TournamentCard from '$components/actions/TournamentCard.svelte'

  export let data: PageData
</script>

<svelte:head>
  <title>Administrateur • Coupe Jules Rimet</title>
</svelte:head>

<div class="content">
  <h2>Espace administrateur</h2>

  <div class="admin">
    <TournamentCard />
  </div>
  <div class="admin">
    <SchoolsCard />
    <TeamsCard />
  </div>
</div>

<style lang="scss">
  div.admin {
    display: flex;
    gap: 40px;
    margin-top: 40px;
    flex-wrap: wrap;

    &:nth-of-type(1) {
      margin-top: 50px;
    }
  }
</style>
