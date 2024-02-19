<script lang="ts">
  import { goto } from '$app/navigation'
  import type { PageData } from './$types'
  import ApiAuthService from '$services/api/api-auth.service'
  import CookiesService from '$services/cookies.service'
  import utils from '$services/utils'

  export let data: PageData

  const apiAuth = new ApiAuthService()
  const cookies = new CookiesService()

  let username: string
  let password: string

  let disabled = false
  let error = false

  async function submit() {
    if (username && password) {
      disabled = true
      ;(await apiAuth.getAuth(username, password)).subscribe({
        next: (res) => {
          cookies.add({ name: 'JWT', value: res.body.data?.jwt })
          goto('/admin')
        },
        error: async (err) => {
          disabled = false
          error = true
          password = ''
          await utils.sleep(600)
          error = false
        }
      })
    }
  }
</script>

<svelte:head>
  <title>Connexion • Coupe Jules Rimet</title>
</svelte:head>

<form on:submit|preventDefault={submit} class:error>
  <h4>Connexion administrateur</h4>

  <label for="username">Nom d'utilisateur :</label>
  <input type="text" id="username" name="username" required bind:value={username} />

  <label for="password">Mot de passe :</label>
  <input type="password" id="password" name="password" required bind:value={password} />

  <button class="primary" {disabled}>Connexion</button>
</form>

<style lang="scss">
  form {
    padding: 50px;
    width: 400px;
    margin: calc(45vh - 170px) auto;
    border: 1px solid var(--border-color);
    border-radius: 3px;
    transition: all 0.1s;
    &.error {
      animation-name: error-jerk;
      animation-duration: 0.5s;
    }
  }

  @keyframes error-jerk {
    0% {
      transform: translateX(0);
    }

    20% {
      transform: translateX(10px);
    }

    40% {
      transform: translateX(-10px);
    }

    60% {
      transform: translateX(10px);
    }

    80% {
      transform: translateX(-10px);
    }

    100% {
      transform: translateX(0);
    }
  }
</style>
