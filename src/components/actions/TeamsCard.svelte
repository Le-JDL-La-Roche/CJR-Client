<div class="card">
  <button class="primary add"><i class="fa-solid fa-plus" /></button>
  <h4>Équipes</h4>

  <table>
    <thead>
      <tr>
        <th style="width: calc(385px / 2 - 80px)">Nom</th>
        <th style="width: calc(385px / 2 - 60px)">École</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <!-- {#each teams as team}
            <tr>
              <td>{school.name}</td>
              <td>{school.teams.length}</td>
            </tr>
            {/each} -->
      <tr>
        <td>France</td>
        <td>La Rochefoucauld</td>
        <td><button class="secondary"><i class="fa-solid fa-gear" /></button></td>
      </tr>
      <tr>
        <td>France</td>
        <td>La Rochefoucauld</td>
        <td><button class="secondary"><i class="fa-solid fa-gear" /></button></td>
      </tr>
      <tr>
        <td>France</td>
        <td>La Rochefoucauld</td>
        <td><button class="secondary"><i class="fa-solid fa-gear" /></button></td>
      </tr>
      <tr>
        <td>France</td>
        <td>La Rochefoucauld</td>
        <td><button class="secondary"><i class="fa-solid fa-gear" /></button></td>
      </tr>
      <tr>
        <td>France</td>
        <td>La Rochefoucauld</td>
        <td><button class="secondary"><i class="fa-solid fa-gear" /></button></td>
      </tr>
      <tr>
        <td>France</td>
        <td>La Rochefoucauld</td>
        <td><button class="secondary"><i class="fa-solid fa-gear" /></button></td>
      </tr>
      <tr>
        <td>France</td>
        <td>La Rochefoucauld</td>
        <td><button class="secondary"><i class="fa-solid fa-gear" /></button></td>
      </tr>
      <tr>
        <td>France</td>
        <td>La Rochefoucauld</td>
        <td><button class="secondary"><i class="fa-solid fa-gear" /></button></td>
      </tr>
      <tr>
        <td>France</td>
        <td>La Rochefoucauld</td>
        <td><button class="secondary"><i class="fa-solid fa-gear" /></button></td>
      </tr>
      <tr>
        <td>France</td>
        <td>La Rochefoucauld</td>
        <td><button class="secondary"><i class="fa-solid fa-gear" /></button></td>
      </tr>
    </tbody>
  </table>
</div>

<style lang="scss">
  @import url('/assets/sass/cards.scss');

  table {
    tbody {
      max-height: calc(300px - 31px - 35px - 40px);
      overflow: auto;
      display: block;
      width: 100%;
    }

    tr td:nth-of-type(1) {
      width: calc(385px / 2 - 80px);
    }
    tr td:nth-of-type(2) {
      width: calc(385px / 2 + 50px);
    }
  }
</style>
