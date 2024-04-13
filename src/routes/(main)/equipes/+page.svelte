<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
</script>

<svelte:head>
  <title>Équipes • Coupe Jules Rimet</title>
</svelte:head>

<div class="content">
  <h2>Équipes</h2>

  <h3>Équipes Collège</h3>
  <div class="teams">
    {#each data.teams as team}
      {#if data.schools.find((s) => s.id === team.school)?.category === 'C'}
        <div class="team">
          <p class="name">
            {team.name}<br />
            <span>{data.schools.find((s) => s.id === team.school)?.name}</span>
          </p>
          <div class="teammates">
            {#each team.teammates as teammate, i}
              <div class="teammate">
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img src={teammate.imageId} alt="Photo" />
                <p>
                  {teammate.name}<br />
                  {#if teammate.captain}
                    <span>(Capitaine)</span>
                  {:else if teammate.substitute}
                    <span>(Remplaçant)</span>
                  {/if}
                </p>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    {/each}
  </div>

  <h3>Équipes Lycée</h3>
  <div class="teams">
    {#each data.teams as team}
      {#if data.schools.find((s) => s.id === team.school)?.category === 'L'}
        <div class="team">
          <p class="name">
            {team.name}<br />
            <span>{data.schools.find((s) => s.id === team.school)?.name}</span>
          </p>
          <div class="teammates">
            {#each team.teammates as teammate, i}
              <div class="teammate">
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img src={teammate.imageId} alt="Photo" />
                <p>
                  {teammate.name}<br />
                  {#if teammate.captain}
                    <span>(Capitaine)</span>
                  {:else if teammate.substitute}
                    <span>(Remplaçant)</span>
                  {/if}
                </p>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    {/each}
  </div>
</div>

<style lang="scss">
  h3 {
    margin-top: 26px;
    font-size: 20px;
  }

  div.teams {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;

    div.team {
      flex: calc(50% - 95px);
      padding: 40px;
      background: #15151c;
      border-radius: 3px;

      p.name {
        font-size: 18px;
        margin-top: 0;
        margin-bottom: 20px;
        font-weight: 600;
        line-height: 1.3;
        text-align: center;

        span {
          font-size: 14px;
        }
      }
    }

    div.teammates {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      justify-content: center;
      align-items: flex-start;

      p {
        font-size: 14px;
        margin-top: 0;
        margin-bottom: 0;
        line-height: 1.3;
        text-align: center;
        font-weight: 500;

        span {
          font-size: 12px;
          font-style: italic;
          font-weight: 400;
        }
      }
      img {
        display: block;
        width: 100px;
        height: 133px;
        border-radius: 3px;
        border: 1px solid #3f3f4e;
        margin-bottom: 10px;
      }
    }
  }

  @media screen and (max-width: 950px) {
    div.team {
      flex: calc(100% - 40px) !important;
    }
  }
</style>
