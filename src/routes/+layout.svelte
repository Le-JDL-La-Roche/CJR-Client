<script lang="ts">
  // import '$'
  import '$assets/sass/style.scss'
  import Navbar from '$components/layouts/Navbar.svelte'
  import type { LayoutData } from './$types'

  export let data: LayoutData
</script>

<Navbar />

<slot />
