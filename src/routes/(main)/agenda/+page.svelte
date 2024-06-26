<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import type { PageData } from './$types'
  import type { Event } from '$models/features/event.model'
  import utils from '$services/utils'
  import { goto } from '$app/navigation'
  import ShowEventModal from '$components/modals/ShowEventModal.svelte'

  export let data: PageData

  const currentDate =
    new Date().getFullYear() +
    '-' +
    (new Date().getMonth() < 9 ? '0' : '') +
    (new Date().getMonth() + 1) +
    '-' +
    (new Date().getDate() < 9 ? '0' : '') +
    new Date().getDate()

  let agenda: { day: string; events: Event[] }[] = []
  let agendaArray: string[] = []
  let selectedDay: number = 0

  let interval: NodeJS.Timeout

  $: if (data.matches || data.events) {
    let daysM = new Set(data.matches.map((match) => match.fromDate.split('T')[0]))
    let daysE = new Set(data.events.map((event) => event.fromDate.split('T')[0]))

    let days = new Set([...daysM, ...daysE])

    agenda = Array.from(days).map((day) => ({ day, events: [] }))

    if (!agenda.find((a) => a.day === currentDate)) {
      agenda.push({ day: currentDate, events: [] })
    }

    data.matches.forEach((match) => {
      let day = match.fromDate.split('T')[0]
      let i = agenda.findIndex((a) => a.day === day)
      let title = `Match ${utils.map.long[match.category]}`
      let content = `${data.schools.find((school) => school.id === match.team1)?.name || 'Équipe 1'}
      <i>vs.</i>
      ${data.schools.find((school) => school.id === match.team2)?.name || 'Équipe 2'}`
      agenda[i].events.push({
        id: match.id || 0,
        title: title,
        content: content,
        fromDate: match.fromDate,
        toDate: match.toDate || '',
        field: match.field || 0,
        category: match.category || 'C',
        status: 1,
        match: true
      })
    })

    data.events.forEach((event) => {
      let day = event.fromDate.split('T')[0]
      let i = agenda.findIndex((a) => a.day === day)
      agenda[i].events.push(event)
    })

    agenda.sort((a, b) => (a.day < b.day ? -1 : 1))

    agendaArray = agenda.map((day) => day.day)
  }

  onMount(() => {
    selectedDay = agendaArray.findIndex((day) => day === currentDate)
    let l = document.querySelector('div.line')! as HTMLElement
    let top = ((new Date().getHours() * 60 + new Date().getMinutes() - 6 * 60) * 14) / 6

    document.querySelector('div.agenda')!.scrollTo(0, top - 100)
    line(l)
    interval = setInterval(() => line(l), 1000 * 120)
  })

  onDestroy(() => {
    clearInterval(interval)
  })

  function line(l: HTMLElement) {
    let date = new Date()
    let minutes = date.getMinutes()
    let hours = date.getHours()
    if (hours >= 21) {
      hours = 21
      minutes = 0
    }
    if (hours < 6) {
      hours = 6
      minutes = 0
    }

    l.style.top = `${(((hours - 6) * 60 + minutes) * (2110 - 10)) / 900 + 10}px`
  }

  let showModal = false
  let e: Event
</script>

<svelte:head>
  <title>Agenda • Coupe Jules Rimet</title>
</svelte:head>

<div class="content">
  <button
    class="secondary expand"
    on:click={() => {
      document.documentElement.requestFullscreen()
      goto('/agenda/fullscreen')
    }}><i class="fa-solid fa-expand" /></button
  >
  <h2>Agenda</h2>

  <div class="head">
    <button class="secondary" disabled={selectedDay === 0} on:click={() => selectedDay--}>
      <i class="fa-solid fa-caret-left" />
    </button>
    <p>
      {new Date(agendaArray[selectedDay]).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
      })}
    </p>
    <button class="secondary" disabled={selectedDay === agendaArray.length - 1} on:click={() => selectedDay++}>
      <i class="fa-solid fa-caret-right" />
    </button>
  </div>
  <div class="agenda">
    <div class="top">
      <p class="h">H</p>
      <p class="field f1">Terrain 1</p>
      <p class="field f2">Terrain 2</p>
      <p class="field f3">Terrain 3</p>
      <p class="field f4">Terrain 4</p>
    </div>
    <div class="inner">
      <div class="h">
        <div class="line" style="display: {agendaArray[selectedDay] === currentDate ? 'block' : 'none'}" />
        {#each ['06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'] as h}
          <p>{h}:00</p>
        {/each}
      </div>
      {#each agenda[selectedDay].events.filter((event) => event.field === 0) as event}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
          class="event-0"
          on:click={() => {
            e = event
            showModal = true
          }}
          style={`display: ${new Date(event.fromDate).getHours() >= 6 ? 'block' : 'none'};
            top: ${
              (((new Date(event.fromDate).getHours() - 6) * 60 + new Date(event.fromDate).getMinutes()) * (2110 - 10)) / 900 + 10
            }px;`}
        >
          <p class="date">
            {new Date(event.fromDate).toLocaleTimeString('fr-FR', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
          <p class="title">{event.title}</p>
        </div>
      {/each}
      {#each [1, 2, 3, 4] as i}
        <div class="field f{i}">
          {#each agenda[selectedDay].events.filter((event) => event.field === i) as event}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
              class="event"
              class:c={event.category === 'C'}
              class:l={event.category === 'L'}
              class:g={event.category === 'g'}
              on:click={() => {
                e = event
                showModal = true
              }}
              style={`display: ${new Date(event.fromDate).getHours() >= 6 ? 'block' : 'none'};
              top: ${
                ((new Date(event.fromDate).getHours() * 60 + new Date(event.fromDate).getMinutes() - 6 * 60) * 14) / 6 + 10
              }px;
              height: ${
                ((new Date(event.toDate + '').getHours() * 60 +
                  new Date(event.toDate + '').getMinutes() -
                  new Date(event.fromDate).getHours() * 60 -
                  new Date(event.fromDate).getMinutes()) *
                  14) /
                  6 -
                (((new Date(event.toDate + '').getHours() * 60 +
                  new Date(event.toDate + '').getMinutes() -
                  new Date(event.fromDate).getHours() * 60 -
                  new Date(event.fromDate).getMinutes()) *
                  14) /
                  6 <=
                16
                  ? 0
                  : 16)
              }px; min-height: 10px`}
            >
              <p class="date">
                {new Date(event.fromDate).toLocaleTimeString('fr-FR', {
                  hour: '2-digit',
                  minute: '2-digit'
                })} - {new Date(event.toDate + '').toLocaleTimeString('fr-FR', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}&nbsp;&nbsp;•&nbsp;&nbsp;<span>{event.title}</span>
              </p>
              <p class="content">{@html event.content}</p>
            </div>
          {/each}
        </div>
      {/each}
    </div>
  </div>
</div>

<ShowEventModal bind:show={showModal} event={e} />

<style lang="scss">
  button.expand {
    display: block;
    margin-top: 0;
    padding: 12px 15px;
    border: 0;
    outline: none;
    cursor: pointer;
    float: right;
  }

  div.head {
    display: flex;
    justify-content: space-between;
    background: #1c1c25;
    padding: 10px 15px;
    border-radius: 3px 3px 0 0;

    p {
      margin: 0;
    }
  }

  div.agenda {
    overflow-y: auto;
    overflow-x: hidden;
    height: 500px;
    position: relative;
    border-radius: 0 0 3px 3px;

    div.top {
      display: flex;
      flex-direction: row;
      position: sticky;
      top: 0;
      z-index: 100000;

      p {
        color: #d0d0d0;
        font-size: 14px;
        text-align: center;
      }

      p.h {
        border-bottom: 2px solid #1c1c25;
        z-index: 1001;
      }

      p.field {
        margin: 0;
        flex: 1;
        padding: 5px 2px;
        background: #18181f;
        border-bottom: 2px solid #1c1c25;
        border-right: 1px solid #1c1c25;
        border-left: 1px solid #1c1c25;

        &.f4 {
          border-right: none;
        }
      }
    }

    div.line {
      width: calc(4 * 282px + 22px);
      height: 2px;
      background: #c70f1e;
      position: absolute;
      left: 51px;
      z-index: 1000;

      &::before {
        content: '';
        display: block;
        width: 6px;
        height: 6px;
        border-radius: 3px;
        background: #c70f1e;
        position: relative;
        top: -2px;
        left: -4px;
      }
    }

    div.inner {
      display: flex;
      flex-direction: row;
      position: relative;

      div.event-0 {
        width: calc(100% - 52px);
        height: 5px;
        background: #c0c0ca;
        position: absolute;
        left: 52px;
        z-index: 4;
        cursor: pointer;
        z-index: 500;

        p.date {
          margin: 0;
          line-height: 1;
          font-size: 11px;
          color: #050505;
          display: inline-block;
          padding: 3px 5px;
          border-radius: 0 0 3px 0;
          background: #c0c0ca;
          position: relative;
          vertical-align: top;
        }

        p.title {
          margin: 0 calc(100% / 2 - 150px / 2);
          width: 150px;
          overflow-x: hidden;
          line-height: 1;
          font-size: 12px;
          color: #010101;
          display: inline-block;
          padding: 5px 7px;
          border-radius: 0 0 3px 3px;
          font-weight: 550;
          vertical-align: top;
          background: #c0c0ca;
          position: relative;
          top: -18px;
        }
      }

      div.h {
        height: 2110px;
        text-align: right;
        z-index: 10000;
        // position: relative;

        p {
          margin-top: 0;
          line-height: 1;
          font-size: 13px;
          margin-bottom: 127px;
          color: #d0d0d0;
          position: relative;

          &::before {
            content: '';
            display: block;
            width: 1151px;
            height: 1px;
            background: #1c1c25;
            position: absolute;
            top: 5px;
            left: 44px;
          }
        }
      }

      div.field {
        flex: 1;
        padding: 5px 2px;
        border: 1px solid #1c1c25;
        border-top: none;
        border-bottom: none;
        height: 2110px;
        position: relative;

        &.f4 {
          border-right: none;
        }
      }

      div.event {
        padding: 7px;
        border-radius: 3px;
        border: 1px solid #3f3f4e;
        position: absolute;
        width: calc(100% - 14px - 6px);
        overflow-y: hidden;
        cursor: pointer;
        z-index: 10000;

        p.date {
          margin: 0;
          line-height: 1;
          font-size: 11px;
          color: #d0d0d0;

          span {
            font-weight: 500;
          }
        }

        p.content {
          font-size: 13px;
          line-height: 1.3;
        }

        &.c {
          background: #28285c;
        }

        &.l {
          background: #5c2828;
        }

        &.g {
          background: #333341;
        }
      }
    }
  }

  button.secondary:disabled {
    color: #a5a5a5 !important;

    i {
      color: #c0c0c0;
    }
  }

  .h {
    width: 40px !important;
    min-width: 40px !important;
    background: #18181f;
    margin: 0;
    padding: 5px;
    border-right: 1px solid #1c1c25;
    position: sticky;
    left: 0;
    z-index: 1000;
  }

  @media screen and (max-width: 1240px) {
    button.expand {
      display: none;
    }

    div.agenda {
      overflow-x: auto;
    }

    .field {
      width: 281px;
      min-width: 281px;
    }

    div.inner,
    div.top {
      width: calc(4 * (281px + 4px) + 40px);
    }

    div.h {
      z-index: 101 !important;
    }
  }
</style>
