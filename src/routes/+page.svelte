<section class="home">
  <div class="content">
    <h1>Bienvenue</h1>
  </div>
</section>

<style lang="scss">
  section.home {
    height: 100vh;
    width: 100vw;
    display: flex;
    background: linear-gradient(to left, rgba(10, 10, 15, 1), rgba(10, 10, 15, 1), rgba(10, 10, 15, 1), rgba(10, 10, 15, 0.9), rgba(10, 10, 15, 0.5)),
      url('/assets/img/wallpaper.png') repeat-x -160px -110px;
    background-size: 100%;
    // background-position-y: -120px;
  }

  div.content {
    width: 50vw;
    margin: 20vh 30px 20vh calc(50vw - 30px);
  }
</style>
