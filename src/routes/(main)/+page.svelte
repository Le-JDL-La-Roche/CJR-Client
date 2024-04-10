<svelte:head>
  <title>Coupe Jules Rimet</title>
</svelte:head>

<section class="home">
  <div class="home-content">
    <h1>Coupe Jules Rimet</h1>

    <a href="/tournois" class="not">
      <button class="home primary">
        <i class="fa-solid fa-sitemap fa-rotate-90" />
        Tournois
      </button>
    </a>

    <a href="/replays">
      <button class="home primary sec">
        <i class="fa-solid fa-circle-play" />
        Direct
      </button>
    </a>
  </div>
</section>

<section class="about">
  <div class="content">
    <h3>À propos de la CJR</h3>

    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio magnam neque id ab in, adipisci repellendus obcaecati!
      Blanditiis fugit illum quaerat, id eligendi, repellat fuga perspiciatis quibusdam maxime odio culpa.<br />
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat magnam distinctio neque nesciunt quae commodi qui reiciendis
      sequi, corrupti, nostrum repudiandae vero ab nulla labore voluptatum dolorem eveniet. Ab, perspiciatis. Lorem ipsum dolor, sit
      amet consectetur adipisicing elit. Dolore quasi corrupti eius mollitia quos ducimus natus, quae, labore aliquid error voluptates
      facilis ipsum magni, eveniet pariatur repellendus odio nesciunt dolorem.
    </p>

    <h3>Photos</h3>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</section>

<style lang="scss">
  section.home {
    height: 100vh;
    display: flex;
    overflow: hidden;
    background: linear-gradient(
        to left,
        rgba(10, 10, 15, 1),
        rgba(10, 10, 15, 1),
        rgba(10, 10, 15, 1),
        rgba(10, 10, 15, 0.9),
        rgba(10, 10, 15, 0.5)
      ),
      url('/assets/img/wallpaper.png') repeat-x -160px -100px;
    background-size: 100%;
  }

  div.home-content {
    width: 55vw;
    margin: 20vh auto 20vh calc(45vw - 30px);
  }

  button.home {
    font-size: 18px;
    padding: 55px 50px 45px 50px;
    font-weight: bold;
    margin-right: 30px;
    display: inline-block;
    width: 190px;

    i {
      display: block;
      font-size: 48px;
      margin-bottom: 20px;
    }
  }

  div.content {
    margin-top: 75px;
    margin-bottom: 50px;
  }

  @media screen and (max-width: 1220px) {
    section.home {
      background-size: 130%;
    }

    div.home-content {
      margin-top: 13vh;
    }

    h1 {
      font-size: 50px;
    }

    button.home {
      padding: 50px 45px 40px 45px;

      i {
        font-size: 45px;
        margin-bottom: 19px;
      }
    }
  }

  @media screen and (max-width: 1010px) {
    div.home-content {
      margin-top: 7vh;
    }

    h1 {
      font-size: 45px;
    }

    button.home {
      padding: 40px 35px 30px 40px;

      i {
        font-size: 45px;
        margin-bottom: 19px;
      }
    }
  }

  @media screen and (max-width: 950px) {
    h1 {
      font-size: 45px;
    }
    section.home {
      background: linear-gradient(to top, rgba(10, 10, 15, 1), rgba(10, 10, 15, 0.9), rgba(10, 10, 15, 0.5)),
        url('/assets/img/wallpaper.png') no-repeat;
      background-size: auto;
      background-position-x: center;
    }

    div.home-content {
      text-align: center;
      width: 100%;
      margin: 15vh 20px auto 20px;
    }

    button.home {
      padding: 35px 30px 25px 30px;
      width: 145px;

      i {
        font-size: 40px;
      }
    }

    button.home.sec {
      margin-right: 0 !important;
    }
  }
</style>
