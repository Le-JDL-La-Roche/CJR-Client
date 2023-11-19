<script lang="ts">
  import { goto } from '$app/navigation'
  import type { PageData } from './$types'

  export let data: PageData

  function submit() {
    // TODO
    goto('/admin')
  }
</script>

<svelte:head>
  <title>Connexion • Coupe Jules Rimet</title>
</svelte:head>

<form on:submit|preventDefault={submit}>
  <h4>Connexion administrateur</h4>

  <label for="username">Nom d'utilisateur :</label>
  <input type="text" id="username" name="username" />

  <label for="password">Mot de passe :</label>
  <input type="password" id="password" name="password" />

  <button class="primary">Connexion</button>
</form>

<style lang="scss">
  form {
    padding: 50px;
    width: 400px;
    margin: calc(45vh - 170px) auto;
    border: 1px solid var(--border-color);
    border-radius: 3px;
  }
</style>