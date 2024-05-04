<script lang="ts">
  let mobileLinks: HTMLDivElement

  function show() {
    if (mobileLinks.style.width == '0px' || mobileLinks.offsetWidth == 0) {
      mobileLinks.style.width = '100%'
    } else {
      mobileLinks.style.width = '0'
    }
  }
</script>

<header>
  <nav class="desktop">
    <ul>
      <div class="links">
        <li class="home">
          <a href="/" class="not"><img class="fav" src="/assets/img/fav2.png" alt="Favicon" />Coupe Jules Rimet</a>
        </li>
        <li class="link"><a href="/tournois" class="not">Tournois</a></li>
        <li class="link"><a href="/equipes" class="not">Équipes</a></li>
        <li class="link"><a href="/agenda" class="not">Agenda</a></li>
        <li class="link"><a href="/replays" class="not">Replays</a></li>
      </div>
      <div class="misc">
        <li class="link media">
          <a href="https://instagram.com/cdm_laroche" target="_blank"><i class="fa-brands fa-instagram" /></a>
        </li>
        <li class="link media">
          <a href="https://youtube.com/@lejdl.laroche" target="_blank"><i class="fa-brands fa-youtube" /></a>
        </li>
        <li>
          <div class="separator" />
          <a href="/connexion" class="not"><button class="secondary"><i class="fa-solid fa-gear" /></button></a>
        </li>
      </div>
    </ul>
  </nav>

  <nav class="mobile">
    <button class="open" on:click={show}><i class="fa-solid fa-bars" /></button>
    <a href="/" class="not home"><img class="fav" src="/assets/img/fav2.png" alt="Favicon" />Coupe Jules Rimet</a>
    <div class="links" bind:this={mobileLinks}>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <ul>
        <button class="open" on:click={show}><i class="fa-solid fa-times" /></button>
        <li class="link" on:click={show}><a href="/" class="not">Accueil</a></li>
        <li class="link" on:click={show}><a href="/tournois" class="not">Tournois</a></li>
        <li class="link" on:click={show}><a href="/equipes" class="not">Équipes</a></li>
        <li class="link" on:click={show}><a href="/agenda" class="not">Agenda</a></li>
        <li class="link" on:click={show}><a href="/replays" class="not">Replays</a></li>
        <li class="link media">
          <a on:click={show} href="https://instagram.com/cdm_laroche" target="_blank"><i class="fa-brands fa-instagram" /></a>
          <a on:click={show} href="https://youtube.com/@lejdl.laroche" target="_blank"><i class="fa-brands fa-youtube" /></a>
          <div class="separator" />
          <a on:click={show} href="/connexion" class="not"><button class="secondary"><i class="fa-solid fa-gear" /></button></a>
        </li>
      </ul>
    </div>
  </nav>
</header>

<style lang="scss">
  nav {
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    z-index: 1000;
  }

  img.fav {
    display: inline-block;
    position: relative;
    top: 3px;
    height: 22px;
    margin-right: 15px;
    transform: scale(1.2);
  }

  a.home,
  a.link {
    display: inline-block;
    padding: 10px 20px 10px 20px;
    font-weight: 800;
    font-size: 18px;
    transition: all 0.1s;
    border-radius: 3px;
    color: white !important;
    text-decoration: none;

    &:hover {
      color: white !important;
    }
  }

  nav.desktop {
    width: calc(100% - 40px);
    padding: 15px 20px;

    ul {
      margin: 0;
      padding: 0;
      display: flex;
      gap: 10px;
      line-height: 1.2 !important;

      div.links {
        width: calc(100% - 140px);
        display: flex;
        gap: 5px;
      }

      div.misc {
        display: flex;
        gap: 10px;

        li {
          padding: 0 10px;

          &.media a {
            padding: 10px 12px;
          }
        }
      }
    }

    li {
      list-style: none;
      display: flex;
      align-items: center;

      &:last-of-type {
        div.separator {
          display: inline-block;
          border-left: 1px solid #505050;
          margin: 0 20px 0 15px;
          height: 41px;
          width: 1px;
        }

        button {
          display: inline-block;
        }
      }

      &.home a,
      &.link a {
        display: inline-block;
        padding: 5px 20px 7px 20px;
        font-weight: 800;
        font-size: 18px;
        transition: all 0.1s;
        border-radius: 3px;

        &:hover {
          background-color: rgba(255, 255, 255, 0.1);

          &:active {
            background-color: rgba(255, 255, 255, 0.2);
          }
        }
      }

      &.home a {
        position: relative;
      }

      &.link a {
        text-align: center;
        padding: 10px 20px;
        font-size: 16px;
        font-weight: 400;
      }

      &.link.media {
        width: 20px;
        padding: 0 10px;
      }
    }
  }

  nav.mobile {
    display: none;
    position: fixed;
    top: 0;
    z-index: 10000;
    width: 100%;

    button.open {
      background-color: transparent;
      padding: 15px 20px 15px 30px;
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
    }

    div.links {
      width: 0;
      height: 100vh;
      overflow: hidden;
      transition: all 0.3s;
      position: fixed;
      background-color: #0f0f14;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      top: 0;
      left: 0;

      ul {
        margin: 0;
        padding: 0;
        gap: 10px;
        line-height: 1.2 !important;

        li {
          list-style: none;
          display: flex;
          align-items: center;

          &.link a {
            display: inline-block;
            padding: 10px 20px 10px 30px;
            font-weight: 800;
            font-size: 18px;
            transition: all 0.1s;
            border-radius: 3px;
            color: white;
            text-decoration: none;
            width: 100%;
          }

          &.link.media {
            padding-top: 20px;
            a {
              width: 22px;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 1240px) {
    a {
      &:hover {
        color: white !important;
      }
    }
  }

  @media screen and (max-width: 768px) {
    nav.desktop {
      display: none;
    }

    nav.mobile {
      display: block;
    }
  }
</style>
