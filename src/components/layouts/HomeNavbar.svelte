<header>
  <nav>
    <ul>
      <div class="links">
        <li class="home"><a href="/" class="not"><img class="fav" src="/assets/img/fav.png" alt="Favicon" />Coupe Jules Rimet</a></li>
        <li class="link"><a href="/" class="not">Tournoi</a></li>
        <li class="link"><a href="/" class="not">Équipes</a></li>
        <li class="link"><a href="/" class="not">Replays</a></li>
        <li class="link"><a href="/" class="not">Agenda</a></li>
      </div>
      <div class="misc">
        <li class="link media">
          <a href="https://instagram.com/cdm_laroche"><i class="fa-brands fa-instagram" /></a>
        </li>
        <li class="link media">
          <a href="https://youtube.com/@lejdl.laroche"><i class="fa-brands fa-youtube" /></a>
        </li>
        <li>
          <div class="separator" />
          <a href="/connexion" class="not"><button class="secondary"><i class="fa-solid fa-right-to-bracket" /></button></a>
        </li>
      </div>
    </ul>
  </nav>
</header>

<style lang="scss">
  nav {
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(30px);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    width: calc(100% - 40px);
    z-index: 1000;
    padding: 15px 20px;

    ul {
      margin: 0;
      padding: 0;
      display: flex;
      gap: 10px;

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

      img.fav {
        display: inline-block;
        position: absolute;
        height: 22px;
        margin-right: 15px;
        left: 20px;
      }

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
        padding: 10px 20px 10px 20px;
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
        padding-left: 57px;
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
</style>
