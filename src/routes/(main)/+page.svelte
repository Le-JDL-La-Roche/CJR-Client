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
      Il y a 10 ans, un éducateur a lancé à La Rochefoucauld un tournoi de football en hommage à Jules Rimet, l'un des fondateurs
      de la FIFA.<br />
      Depuis lors, ce tournoi a progressivement évolué pour inclure cette année une nouvelle dimension : un tournoi “inter-écoles”.
      Les établissements participants organisent des tournois dans leurs écoles respectives, et les équipes victorieuses de ces tournois
      se qualifient pour la Coupe Jules Rimet, où elles affrontent les équipes des autres écoles !<br />
      <br />
      Merci à La Salle Passy-Buzenval d'accueillir cette première édition de la Coupe Jules Rimet.
    </p>

    <h3>Photos</h3>

    <div class="img">
      <img src="/assets/img/1.jpg" alt="Illustration" />
      <img src="/assets/img/2.jpg" alt="Illustration" />
      <img src="/assets/img/3.jpg" alt="Illustration" />
    </div>

    <p style="text-align: right"><small><i style="color: #d0d0d0">Crédits : <a target="_blank" href="https://instagram.com/cdm_laroche">@cdm_laroche</a></i></small></p>
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

  div.img {
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
    justify-content: space-evenly;

    img {
      display: block;
      flex: 1;
      width: calc(100% / 3 - 20px);
      border-radius: 3px;
    }
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

    div.img {
      img {
        width: calc(100% / 2 - 30px);
        max-width: calc(100% / 2 - 30px);
      }
    }
  }
</style>
