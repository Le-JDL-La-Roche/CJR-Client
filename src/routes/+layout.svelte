<script lang="ts">
  import '$assets/sass/style.scss'
  import HomeFooter from '$components/layouts/HomeFooter.svelte'
  import HomeNavbar from '$components/layouts/HomeNavbar.svelte'
</script>

<HomeNavbar />

<slot />

<HomeFooter />