<div class="card">
  <button class="primary add"><i class="fa-solid fa-plus" /></button>
  <h4>Écoles</h4>

  <table>
    <thead>
      <tr>
        <th style="width: 385px">Nom</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <!-- {#each schools as school}
            <tr>
              <td>{school.name}</td>
              <td>{school.teams.length}</td>
            </tr>
            {/each} -->
      <tr>
        <td>La Rochefoucauld</td>
        <td><button class="secondary"><i class="fa-solid fa-gear" /></button></td>
      </tr>
      <tr>
        <td>La Rochefoucauld</td>
        <td><button class="secondary"><i class="fa-solid fa-gear" /></button></td>
      </tr>
      <tr>
        <td>La Rochefoucauld</td>
        <td><button class="secondary"><i class="fa-solid fa-gear" /></button></td>
      </tr>
      <tr>
        <td>La Rochefoucauld</td>
        <td><button class="secondary"><i class="fa-solid fa-gear" /></button></td>
      </tr>
      <tr>
        <td>La Rochefoucauld</td>
        <td><button class="secondary"><i class="fa-solid fa-gear" /></button></td>
      </tr>
      <tr>
        <td>La Rochefoucauld</td>
        <td><button class="secondary"><i class="fa-solid fa-gear" /></button></td>
      </tr>
      <tr>
        <td>La Rochefoucauld</td>
        <td><button class="secondary"><i class="fa-solid fa-gear" /></button></td>
      </tr>
      <tr>
        <td>La Rochefoucauld</td>
        <td><button class="secondary"><i class="fa-solid fa-gear" /></button></td>
      </tr>
      <tr>
        <td>La Rochefoucauld</td>
        <td><button class="secondary"><i class="fa-solid fa-gear" /></button></td>
      </tr>
      <tr>
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
      width: 385px;
    }
  }
</style>
