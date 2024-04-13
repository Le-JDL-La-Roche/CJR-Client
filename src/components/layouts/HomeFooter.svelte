<footer>
  <div class="content">
    <div>
      <h5>Coupe Jules Rimet</h5>
      <p>
        Jules Rimet (1873-1956), est un dirigeant du football français. Avocat de formation, Rimet commence, dès sa jeunesse, à
        s'intéresser fortement au football, lorsqu'il se trouve dans le prestigieux établissement La Rochefoucauld.<br />
        <i>D'après Wikipédia</i>
      </p>
    </div>
    <div>
      <h5>Informations</h5>
      <p>
        <a href="/a-propos">À propos de ce site Web</a><br>
        <a href="https://le-jdl-laroche.cf" target="_blank">Site du Journal du Lycée La Rochefoucauld</a>
      </p>
    </div>
  </div>
</footer>

<style lang="scss">
  footer {
    background-color: #15151a;
    padding: 1px 0;

    div.content {
      display: flex;
      gap: 30px;
      margin: 75px auto;

      div {
        flex: 1;
      }
    }

    p {
      font-size: 14px;
      margin-bottom: 0;
    }
  }

  @media screen and (max-width: 950px) {
    div.content {
      flex-direction: column;
    }
  }
</style>
