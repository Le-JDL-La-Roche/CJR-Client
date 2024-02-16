<script lang="ts">
  import ModalTemplate from './ModalTemplate.svelte'
  import ApiSchoolsService from '$services/api/api-schools.service'
  import type { School } from '$models/features/school.model'
  import type { PageData } from '../../routes/admin/$types'

  export let show: boolean
  export let data: PageData
  export let school: School | undefined

  const apiSchools = new ApiSchoolsService()

  let name: string
  let category: 'C' | 'L' | 0

  let error: string

  $: if (show) update()

  $: s = { category, name } as School

  function update() {
    error = ''
    if (school) {
      name = school.name
      category = school.category
    } else {
      name = ''
      category = 0
    }
  }

  async function submit() {
    const exec = school ? apiSchools.putSchool : apiSchools.postSchool
    ;(await exec(s, school ? school.id! : 0)).subscribe({
      next: (res) => {
        data.schools = res.body.data!.schools
        show = false
      },
      error: (err) => {
        error = err.body.message
      }
    })
  }

  async function del() {
    if (confirm('Voulez-vous supprimer cette école ?\nLes équipes et matchs associés seront également supprimés.')) {
      ;(await apiSchools.deleteSchool(school!.id!)).subscribe({
        next: (res) => {
          data.schools = res.body.data!.schools
          data.teams = res.body.data!.teams
          data.matches = res.body.data!.matches
          show = false
        },
        error: (err) => {
          error = err.body.message
        }
      })
    }
  }
</script>

<ModalTemplate size={'s'} bind:show>
  <form on:submit|preventDefault={submit}>
    <h4>{school ? "Modifier l'école" : 'Ajouter une école'}</h4>

    <label for="category">Collège/Lycée :</label>
    <select name="category" bind:value={category}>
      <option value={0} disabled>-- Sélectionner --</option>
      <option value="C">Collège</option>
      <option value="L">Lycée</option>
    </select>

    <label for="name">Nom de l'école :</label>
    <input type="text" bind:value={name} />

    <p class="error">{error}</p>

    <div class="actions">
      {#if school}
        <button class="secondary" type="button" on:click={del}>Supprimer</button>
      {/if}
      <button class="primary">{school ? 'Sauvegarder' : 'Ajouter'}</button>
    </div>
  </form>
</ModalTemplate>

<style lang="scss">
  @use '../../../static/assets/sass/modal.scss';
</style>
