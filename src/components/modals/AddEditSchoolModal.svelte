<script lang="ts">
  import ModalTemplate from './ModalTemplate.svelte'
  import ApiSchoolsService from '$services/api/api-schools.service'
  import type { School, Teammate } from '$models/features/school.model'
  import type { PageData } from '../../routes/(main)/admin/$types'

  export let show: boolean
  export let data: PageData
  export let school: School | undefined

  const apiSchools = new ApiSchoolsService()

  let name: string
  let category: 'C' | 'L' | 0
  let teammates: Teammate[]

  let teammatesLength: number

  let error: string

  $: if (show) update()

  $: s = { category, name, teammates } as School

  function update() {
    error = ''
    if (school) {
      name = school.name
      category = school.category
      teammates = school.teammates
      teammatesLength = school.teammates.length
    } else {
      name = ''
      category = 0
      teammates = []
      teammatesLength = 7
      updateTeammates()
    }
  }

  function updateTeammates() {
    if (teammatesLength > teammates.length) {
      for (let i = teammates.length; i < teammatesLength; i++) {
        teammates.push({ name: '', captain: i === 0, substitute: false, imageId: '' })
      }
    } else {
      while (teammatesLength < teammates.length) {
        teammates.pop()
      }
    }
    teammates = teammates
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
    if (confirm('Voulez-vous supprimer cette école ?\nLes matchs associés seront également supprimés.')) {
      ;(await apiSchools.deleteSchool(school!.id!)).subscribe({
        next: (res) => {
          data.schools = res.body.data!.schools
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

<ModalTemplate size={'m'} bind:show>
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

    <label for="teammates">
      Équipiers :&nbsp;&nbsp;
      <input
        type="number"
        min="5"
        max="20"
        bind:value={teammatesLength}
        on:click={updateTeammates}
        style="display: inline; width: 35px; margin-bottom: 10px;"
      />
    </label>
    {#each teammates as teammate, i}
      <div class="teammate">
        <input
          style="display: inline; width: 350px; margin-right: 20px; margin-bottom: 10px;"
          type="text"
          bind:value={teammate.name}
          placeholder="Nom"
        />

        <input
          style="display: inline; width: 160px; margin-right: 20px; margin-bottom: 10px; cursor: help"
          type="text"
          bind:value={teammate.imageId}
          placeholder="Photo"
          title="Héberger cette photo sur Imgur et coller le lien de l'image ici."
        />

        {#if i === 0}
          <label for="teammate-{i}-captain" style="margin-right: 20px;">
            <input type="checkbox" bind:checked={teammate.captain} disabled id="teammate-{i}-captain" />&nbsp;&nbsp;Capitaine
          </label>
        {:else}
          <label for="teammate-{i}-substitute">
            <input
              type="checkbox"
              bind:checked={teammate.substitute}
              disabled={teammate.captain}
              id="teammate-{i}-substitute"
            />&nbsp;&nbsp;Remplaçant
          </label>
        {/if}
      </div>
    {/each}

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
