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

<div class="phone">
  <h2>📱</h2>
  <p style="font-weight: bold; margin-top: 0;">
    Vous êtes sur un téléphone ou l'écran de votre ordinateur est trop petit.<br />
    Veuillez utiliser un ordinateur avec un écran d'au moins 1240 pixels de large pour accéder à cette page.
  </p>
</div>

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
    border: 1px solid #a0a0a0;
    border-radius: 3px;
    transition: all 0.1s;
    &.error {
      animation-name: error-jerk;
      animation-duration: 0.5s;
    }
  }

  div.phone {
    display: none;
  }

  @media screen and (max-width: 1240px) {
    div.phone {
      position: fixed;
      top: 0;
      left: 0;
      padding: 20px;
      height: calc(100vh - 40px);
      width: calc(100vw - 40px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: #0f0f14;
      z-index: 1000;
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
