<div class="card"  style="height: 400px">
  <button class="primary add"><i class="fa-solid fa-plus" /></button>
  <h4>Agenda</h4>

  <table>
    <thead>
      <tr>
        <th style="width: 790px" colspan="3">Match</th>
        <th style="width: 100px">Date</th>
        <th style="width: 50px">Terrain</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>France (La Rochefoucauld)</td>
        <td>–</td>
        <td>France (La Rochefoucauld)</td>
        <td>01/01/2024, 12:05</td>
        <td>1</td>
        <td><button class="secondary"><i class="fa-solid fa-gear" /></button></td>
      </tr>
      <tr>
        <td>France (La Rochefoucauld)</td>
        <td>–</td>
        <td>France (La Rochefoucauld)</td>
        <td>01/01/2024, 12:05</td>
        <td>1</td>
        <td><button class="secondary"><i class="fa-solid fa-gear" /></button></td>
      </tr>
      <tr>
        <td>France (La Rochefoucauld)</td>
        <td>–</td>
        <td>France (La Rochefoucauld)</td>
        <td>01/01/2024, 12:05</td>
        <td>1</td>
        <td><button class="secondary"><i class="fa-solid fa-gear" /></button></td>
      </tr>
      <tr>
        <td>France (La Rochefoucauld)</td>
        <td>–</td>
        <td>France (La Rochefoucauld)</td>
        <td>01/01/2024, 12:05</td>
        <td>1</td>
        <td><button class="secondary"><i class="fa-solid fa-gear" /></button></td>
      </tr>
      <tr>
        <td>France (La Rochefoucauld)</td>
        <td>–</td>
        <td>France (La Rochefoucauld)</td>
        <td>01/01/2024, 12:05</td>
        <td>1</td>
        <td><button class="secondary"><i class="fa-solid fa-gear" /></button></td>
      </tr>
      <tr>
        <td>France (La Rochefoucauld)</td>
        <td>–</td>
        <td>France (La Rochefoucauld)</td>
        <td>01/01/2024, 12:05</td>
        <td>1</td>
        <td><button class="secondary"><i class="fa-solid fa-gear" /></button></td>
      </tr>
      <tr>
        <td>France (La Rochefoucauld)</td>
        <td>–</td>
        <td>France (La Rochefoucauld)</td>
        <td>01/01/2024, 12:05</td>
        <td>1</td>
        <td><button class="secondary"><i class="fa-solid fa-gear" /></button></td>
      </tr>
      <tr>
        <td>France (La Rochefoucauld)</td>
        <td>–</td>
        <td>France (La Rochefoucauld)</td>
        <td>01/01/2024, 12:05</td>
        <td>1</td>
        <td><button class="secondary"><i class="fa-solid fa-gear" /></button></td>
      </tr>
    </tbody>
  </table>
</div>

<style lang="scss">
  @use '../../../static/assets/sass/cards.scss';

  table {
    tbody {
      max-height: calc(400px - 31px - 35px - 40px);
      overflow: auto;
      display: block;
      width: 100%;
    }

    tr td:nth-of-type(1),
    tr td:nth-of-type(3) {
      width: calc(730px / 2) - 3px;
    }

    tr td:nth-of-type(1) {
      text-align: right;
    }

    tr td:nth-of-type(2) {
      width: 6px;
    }

    tr td:nth-of-type(4) {
      width: 100px;
      text-align: center;
    }

    tr td:nth-of-type(5) {
      width: 50px;
      text-align: center;
    }
  }
</style>
