<script lang="ts">
  import type { PageData } from '../../routes/(main)/admin/$types'

  export let data: PageData
</script>

<div class="card">
  <h4>Gestion du streaming</h4>

  <p class="desc">
    <small>
      Gestion du streaming pour le Terrain 1.<br />
      <span style="color: #ff6c6c">
        <b style="color: #ff6c6c">Attention !</b> Une seule personne peut se connecter à cet espace !
      </span>
    </small>
  </p>

  <a href="/admin/streaming" class="not">
    <button class="primary">Gérer le streaming&nbsp;&nbsp;<i class="fa-solid fa-arrow-right" /></button>
  </a>
</div>

<style lang="scss">
  @use '../../../static/assets/sass/cards.scss';

  p.desc {
    line-height: 1.3;
  }
</style>
