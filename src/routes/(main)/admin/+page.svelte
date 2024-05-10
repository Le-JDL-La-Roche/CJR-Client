<script lang="ts">
  import type { PageData } from './$types'
  import SchoolsCard from '$components/actions/SchoolsCard.svelte'
  // import TeamsCard from '$components/actions/TeamsCard.svelte'
  import Tournament2Card from '$components/actions/Tournament2Card.svelte'
  import MatchesCard from '$components/actions/MatchesCard.svelte'
  import CookiesService from '$services/cookies.service'
  import AgendaCard from '$components/actions/AgendaCard.svelte'
  import { goto } from '$app/navigation'
  import ApiAuthService from '$services/api/api-auth.service'
  import LiveCard from '$components/actions/LiveCard.svelte'
  import StreamCard from '$components/actions/StreamCard.svelte'

  export let data: PageData

  const apiAuth = new ApiAuthService()
  const cookies = new CookiesService()

  async function logout() {
    ;(await apiAuth.deleteLogout()).subscribe({
      finally: () => {
        cookies.delete('JWT')
        goto('/')
      }
    })
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
    <Tournament2Card bind:data />
  </div>
  <div class="admin">
    <SchoolsCard bind:data />
    <!-- <TeamsCard bind:data /> -->
  </div>
  <div class="admin">
    <AgendaCard bind:data />
  </div>
  <div class="admin">
    <LiveCard bind:data />
    <StreamCard bind:data />
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
