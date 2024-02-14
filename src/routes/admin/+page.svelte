<script lang="ts">
  import type { PageData } from './$types'
  import SchoolsCard from '$components/actions/SchoolsCard.svelte'
  import TeamsCard from '$components/actions/TeamsCard.svelte'
  import TournamentCard from '$components/actions/TournamentCard.svelte'
  import MatchesCard from '$components/actions/MatchesCard.svelte'
  import CookiesService from '$services/cookies.service'
  import AgendaCard from '$components/actions/AgendaCard.svelte'
  import { goto } from '$app/navigation'

  export let data: PageData

  const cookies = new CookiesService()

  function logout() {
    cookies.delete('JWT')
    goto('/')
  }
</script>

<svelte:head>
  <title>Administrateur • Coupe Jules Rimet</title>
</svelte:head>

<div class="content">
  <button class="secondary logout" on:click={logout}><i class="fa-solid fa-right-from-bracket" />&nbsp;&nbsp;Déconnexion</button>
  <h2>Espace administrateur</h2>

  <div class="admin">
    <MatchesCard bind:data />
  </div>
  <div class="admin">
    <TournamentCard bind:data />
  </div>
  <div class="admin">
    <SchoolsCard bind:data />
    <TeamsCard bind:data />
  </div>
  <div class="admin">
    <AgendaCard />
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

  button.logout {
    margin-top: 10px;
    float: right;
    background: #5c3939;

    &:hover {
      background: #5c3b39;
    }
  }
</style>
