<header>
  <nav>
    <ul>
      <li><a href="/connexion" class="not"><button class="secondary">Connexion</button></a></li>
      <li class="home"><a href="/" class="not">Coupe Jules Rimet</a></li>
    </ul>
  </nav>
</header>

<style lang="scss">
  nav {
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(10px);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    // padding: 15px 20px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;

    ul {
      margin: 0;
      padding: 0;
    }

    li {
      list-style: none;

      &:nth-of-type(1) {
        float: right;
        padding: 15px 20px;
      }

      &.home a {
        display: inline-block;
        padding: 19px 20px 20px 20px;
        font-weight: 800;
        font-size: 18px;
        transition: all 0.1s;

        &:hover {
          background-color: rgba(255, 255, 255, 0.05);
        }
      }
    }
  }
</style>
