<script lang="ts">
  import ModalTemplate from './ModalTemplate.svelte'
  import ApiSchoolsService from '$services/api/api-schools.service'
  import type { School } from '$models/features/school.model'
  import type { PageData } from '../../routes/admin/$types'

  export let show: boolean
  export let data: PageData

  const apiSchools = new ApiSchoolsService()

  let school: School = {
    category: 'C',
    name: ''
  }

  let error = ''

  $: if (show) {
    error = ''
    school = {
      category: 'C',
      name: ''
    }
  }

  async function submit() {
    ;(await apiSchools.postSchool(school)).subscribe({
      next: (res) => {
        data.schools = res.body.data?.schools || []
        show = false
      },
      error: (err) => {
        error = err.body.message
      }
    })
  }
</script>

<ModalTemplate size={'s'} bind:show>
  <form on:submit|preventDefault={submit}>
    <h4>Ajouter une école</h4>

    <label for="category">Collège/Lycée :</label>
    <select name="category" id="category" bind:value={school.category}>
      <option value="C">Collège</option>
      <option value="L">Lycée</option>
    </select>

    <label for="name">Nom de l'école :</label>
    <input type="text" bind:value={school.name} id="name" />

    <p class="error">{error}</p>

    <div class="actions">
      <button class="primary">Ajouter</button>
    </div>
  </form>
</ModalTemplate>

<style lang="scss">
  @use '../../../static/assets/sass/modal.scss';
</style>
