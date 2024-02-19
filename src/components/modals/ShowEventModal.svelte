<script lang="ts">
  import ModalTemplate from './ModalTemplate.svelte'
  import ApiSchoolsService from '$services/api/api-schools.service'
  import type { School } from '$models/features/school.model'
  import ApiAgendaService from '$services/api/api-agenda.service'
  import type { Event } from '$models/features/event.model'

  export let show: boolean
  export let event: Event = {
    title: '',
    content: '',
    fromDate: '',
    toDate: '',
    field: 0,
    category: 'g',
    status: 1
  }
</script>

<ModalTemplate size={'s'} bind:show>
  <h4>{event.title}</h4>
  <p class="date">
      {new Date(event.fromDate + '').toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
      })}
      {#if event.field !== 0}
        - {new Date(event.toDate + '').toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit'
        })}
      {/if}&nbsp;&nbsp;—&nbsp;&nbsp;
      {['Évènement global', 'Terrain 1', 'Terrain 2', 'Terrain 3', 'Terrain 4'][event.field]}{@html event.field !== 0
        ? '&nbsp;&nbsp;—&nbsp;&nbsp;' + {C: 'Évènement collège', L: 'Évènement lycée', g: 'Évènement commun'}[event.category]
        : ''}
  </p>

  <p class="content">{@html event.content}</p>
</ModalTemplate>

<style lang="scss">
  @use '../../../static/assets/sass/modal.scss';

  h4 {
    margin-bottom: 10px;
  }

  p.date {
    margin-top: 0;
    margin-bottom: 40px;
    color: #d0d0d0;
    line-height: 1;
    font-size: 13px;
  }

  p.content {
    margin: 0;
  }
</style>
