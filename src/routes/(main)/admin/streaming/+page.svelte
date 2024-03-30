<script lang="ts">
  import io from '$services/api/socket.service'
  import CookiesService from '$services/cookies.service'
  import type { PageData } from './$types'

  export let data: PageData

  const cookies = new CookiesService()

  let play = false

  let itv: NodeJS.Timeout

  let t = 0
  let tStr = '00:00'

  let t1 = 'EQ1'
  let t2 = 'EQ2'

  let s1 = '0'
  let s2 = '0'

  let add = '0'

  function playPause() {
    play = !play
    if (play) {
      itv = setInterval(() => {
        if (play) {
          t++
          tStr = `${Math.floor(t / 60)
            .toString()
            .padStart(2, '0')}:${(t % 60).toString().padStart(2, '0')}`
        }
      }, 1000)
    } else {
      clearInterval(itv)
    }
    send()
  }

  function stop() {
    clearInterval(itv)
    play = false
    t = 0
    tStr = `${Math.floor(t / 60)
      .toString()
      .padStart(2, '0')}:${(t % 60).toString().padStart(2, '0')}`
    send()
  }

  function minus() {
    if (t < 60) return
    t -= 60
    t = Math.floor(t / 60) * 60
    tStr = `${Math.floor(t / 60)
      .toString()
      .padStart(2, '0')}:${(t % 60).toString().padStart(2, '0')}`
    send()
  }

  function round() {
    t = Math.floor(t / 60) * 60
    tStr = `${Math.floor(t / 60)
      .toString()
      .padStart(2, '0')}:${(t % 60).toString().padStart(2, '0')}`
    send()
  }

  function plus() {
    t += 60
    t = Math.floor(t / 60) * 60
    tStr = `${Math.floor(t / 60)
      .toString()
      .padStart(2, '0')}:${(t % 60).toString().padStart(2, '0')}`
    send()
  }

  function send() {
    io.emit('updateScoreboard', { jwt: cookies.get('JWT'), scoreboard: { t1, t2, s1, s2, play, t, add } })
  }
</script>

<svelte:head>
  <title>Streaming • Coupe Jules Rimet</title>
</svelte:head>

<div class="content">
  <h2>
    <a class="not" href="/admin"><button class="secondary back"><i class="fa-solid fa-arrow-left" /></button></a
    >&nbsp;&nbsp;&nbsp;Gestion du streaming
  </h2>

  <div class="scoreboard">
    <!-- svelte-ignore a11y-missing-attribute -->
    <img src="/assets/img/scoreboard.png" class="logo" />
    <div class="frame">
      <div class="board">
        <span contenteditable="true" bind:textContent={t1}>FRA</span>
        <span>
          <span class="in" contenteditable="true" bind:textContent={s1}>8</span> –
          <span class="in" contenteditable="true" bind:textContent={s2}>8</span>
        </span>
        <span contenteditable="true" bind:textContent={t2}>MON</span>
        <span>{tStr}</span>
        <span>+<span class="in" contenteditable="true" bind:textContent={add}>18</span></span>
      </div>
    </div>
    <div class="actions">
      <button class="secondary play" on:click={playPause}>
        <i class="fa-solid {play ? 'fa-pause' : 'fa-play'}" />
      </button>
      <button class="secondary stop" on:click={stop}><i class="fa-solid fa-stop" /></button>
      <button class="secondary minus" style="margin-right: 0" on:click={minus}><i class="fa-solid fa-minus" /></button>
      <button class="secondary minus" style="margin-right: 0" on:click={round}><i class="fa-solid fa-angle-left" /></button>
      <button class="secondary minus" on:click={plus}><i class="fa-solid fa-plus" /></button>

      <button class="primary send" on:click={send}><i class="fa-solid fa-check" /></button>
    </div>
  </div>
</div>

<style lang="scss">
  button.secondary.back {
    display: inline;
    height: 40px;
    vertical-align: top;
  }

  button.play,
  button.stop,
  button.minus,
  button.plus {
    width: 35px;
    display: inline-block;
    margin-right: 10px;
  }

  button.send {
    width: 45px;
    display: inline-block;
    margin-left: 15px;
    position: relative;
    top: -57px;
    right: -25px;
    margin-top: 0;
  }

  h4 {
    margin-bottom: 30px;
  }

  div.scoreboard {
    img.logo {
      width: 100px;
      height: 100px;
      margin: 0 auto;
      position: relative;
      bottom: -40px;
    }

    div.frame {
      display: inline-block;
      position: relative;
      right: 20px;
      z-index: 100;
    }

    div.board {
      display: flex;
      background: rgb(228, 221, 221);
      border-radius: 0 0 25px 0;
      width: 450px;
      overflow: hidden;

      span.in {
        outline: none;
      }

      span:not(.in) {
        width: 70px;
        color: black;
        padding: 10px 15px;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        color: #a01300;
        outline: none;

        &:nth-child(2) {
          background: #a01300;
          color: white;
          width: 90px;
        }

        &:nth-child(4) {
          padding-left: 25px;
          width: 75px;
          border-radius: 22px 0 0 22px;
          background: #a01300;
          color: white;
          text-align: left;
        }

        &:nth-child(5) {
          background: #610c01;
          color: white;
          width: 50px;
          padding-right: 20px;
          border-radius: 0 0 20px 0;
        }
      }
    }

    div.actions {
      margin-top: 15px;
      margin-left: 305px;
    }
  }
</style>
