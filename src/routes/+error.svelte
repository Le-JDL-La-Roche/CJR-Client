<script lang="ts">
  import { page } from '$app/stores'

  const error = { _404: 'Page non trouvée', _500: 'Erreur interne du serveur' }
</script>

<div class="content">
  <h1>{$page.status}</h1>
  <h3>{$page.status === 404 ? error._404 : $page.status === 500 ? error._500 : 'Erreur'}</h3>
  <a href="/" class="not">
    <button class="secondary"><i class="fa-solid fa-caret-left" />&nbsp;&nbsp;Retour</button>
  </a>
</div>

<style lang="scss">
  h1 {
    margin-top: calc(40vh - 50px);
    margin-bottom: 0;
  }

  h1,
  h3 {
    text-align: center;
  }

  button {
    margin: auto;
  }
</style>
