<script lang="ts">
  import { scale } from 'svelte/transition'

  export let size: 's' | 'm' | 'l' = 'm'
  export let show: boolean
</script>

{#if show}
  <div class="modal-background" transition:scale={{ start: 1.5, duration: 300 }}>
    <div class={'modal size-' + size} id="modal__">
      <section class="close">
        <button class="close secondary" on:click={() => (show = false)}><i class="fa-solid fa-times" /></button>
      </section>
      <slot />
    </div>
  </div>
{/if}

<style lang="scss">
  div.modal-background {
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    transition: opacity 0.2s, background-color 0.2s, transform 0.2s, display 0s;
    z-index: 10000;
    display: flex;
    align-items: center;

    div.modal {
      width: calc(100% - 90px);
      max-height: calc(100% - 90px);
      overflow-y: auto;
      background-color: #15151c;
      border-radius: 5px;
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
      border: 1px solid var(--light-gray-color);
      margin: 15px auto;
      padding: 40px;
      position: relative;
      transition: opacity 0.2s, background-color 0.2s, transform 0.2s, display 0s;

      &.size-l {
        width: calc(100% - 30px);
        height: calc(100% - 60px);
        margin: 15px;
        overflow-y: auto;
      }

      button.close {
        float: right;
        width: 32px;
        margin-top: 0;
      }
    }
  }

  @media screen and (min-width: 850px) {
    div.modal-background {
      div.modal {
        max-height: 350px;
        margin: 0 auto 25px auto;

        &.size-s {
          width: 400px;
        }

        &.size-m {
          width: 750px;
        }

        &.size-l {
          width: calc(100% - 60px);
          height: calc(100% - 120px);
          max-height: calc(100% - 120px);
          margin: 30px;
        }
      }
    }

    @media screen and (min-width: 1150px) {
      div.modal-background {
        div.modal {
          margin: 0 auto 20px auto;
          max-height: 500px;
        }
      }
    }
  }

  @media print {
    div.modal-background {
      display: block !important;
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: calc(2 * 29.685cm) !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden;
    }
    div.modal {
      position: initial !important;
      overflow: hidden !important;
      padding: 0 !important;
      margin: 0 !important;
      width: 100% !important;
      height: calc(2 * 29.685cm) !important;
      max-height: calc(2 * 29.685cm) !important;
      border: 0 !important;
      border-radius: 0 !important;
    }
    button.close {
      display: none !important;
    }
  }
</style>