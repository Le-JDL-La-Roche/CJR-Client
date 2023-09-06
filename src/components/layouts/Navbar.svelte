<header>
  <nav>
    <ul>
      <li><a href="/">Match Manager</a></li>
      <li>
        <a href="/connexion" class="not">
          <button class="secondary">Connexion</button>
        </a>
      </li>
    </ul>
  </nav>
</header>

<style lang="scss">
  nav {
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(10px);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    padding: 15px 20px;
    position: fixed;
    top: 0;
    width: calc(100% - 40px);

    ul {
      display: flex;
      align-items: center;
      margin: 0;
      padding: 0;
    }

    li {
      list-style: none;

      &:nth-of-type(1) {
        flex: 1
      }
    }
  }
</style>
