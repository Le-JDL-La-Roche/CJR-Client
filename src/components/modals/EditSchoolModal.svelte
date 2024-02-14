<script lang="ts">
  import ModalTemplate from './ModalTemplate.svelte'
  import ApiSchoolsService from '$services/api/api-schools.service'
  import type { School } from '$models/features/school.model'
  import type { PageData } from '../../routes/admin/$types'

  export let show: boolean
  export let data: PageData
  export let school: School

  const apiSchools = new ApiSchoolsService()

  let error = ''

  $: if (show) {
    error = ''
  }

  async function submit() {
    ;(await apiSchools.putSchool(school, school.id || 0)).subscribe({
      next: (res) => {
        data.schools = res.body.data?.schools || []
        show = false
      },
      error: (err) => {
        error = err.body.message
      }
    })
  }

  async function deleteSchool() {
    if (confirm('Voulez-vous supprimer cette école ?\nLes équipes et matchs associés seront également supprimés.')) {
      ;(await apiSchools.deleteSchool(school.id || 0)).subscribe({
        next: (res) => {
          data.schools = res.body.data?.schools || []
          data.teams = res.body.data?.teams || []
          data.teams.forEach((team, i) => {
            data.teams[i].teammates = JSON.parse(team.teammates as unknown as string)
          })
          data.matches = res.body.data?.matches || []
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
    <h4>Modifier l'école</h4>

    <label for="category">Collège/Lycée :</label>
    <select name="category" bind:value={school.category}>
      <option value="C">Collège</option>
      <option value="L">Lycée</option>
    </select>

    <label for="name">Nom de l'école :</label>
    <input type="text" bind:value={school.name} />

    <p class="error">{error}</p>

    <div class="actions">
      <button class="secondary" type="button" on:click={deleteSchool}>Supprimer</button>
      <button class="primary">Sauvegarder</button>
    </div>
  </form>
</ModalTemplate>

<style lang="scss">
  @use '../../../static/assets/sass/modal.scss';

  div.actions {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-top: 30px;

    button {
      flex: 1;
      margin-top: 0px;

      &.secondary {
        background: #5c3939;

        &:hover {
          background: #5c3b39;
        }
      }
    }
  }
</style>
