<section class="home">
  <div class="home-content">
    <h1>Coupe Jules Rimet</h1>

    <a href="/tournoi" class="not">
      <button class="home primary">
        <i class="fa-solid fa-sitemap fa-rotate-90" />
        Tournoi
      </button>
    </a>

    <a href="/direct">
      <button class="home primary">
        <i class="fa-solid fa-circle-play" />
        Direct
      </button>
    </a>
  </div>
</section>

<section class="about">
  <div class="content">
    <h2>A propos de la CJR</h2>
  </div>
</section>

<style lang="scss">
  section.home {
    height: 100vh;
    // width: 100vw;
    // max-width: 100vw;
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
</style>
