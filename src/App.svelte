<script>
import { fade } from 'svelte/transition'
import { parser } from './bem.js'
import { sample } from './sample.js'

let html = sample
$: result = parser(html)
</script>

<main>
  <div class="bem">
    <div class="bem-editor">
      <textarea
        class="bem-editor__source"
        spellcheck="false"
        bind:value={html}
        placeholder="Введите или вставьте HTML код"
      ></textarea>
    </div>
    <div class="bem-scheme">
      

          {#if result.ok && result.notbem.length > 0}
            <div transition:fade class="bem-scheme__error">
              <p transition:fade class="bem-scheme__error-title">Неверно используемые элементы и модификаторы &#9888;</p>
                {#each result.notbem as item, i}
                  <div transition:fade class="bem-scheme__notbam-element item">{item}</div>
                {/each}
            </div>
          {/if}

          {#if result.ok}
            <p transition:fade class="bem-scheme__title">Схема BEM</p>
            {#each result.bem as item, i}
              <div class="bem-scheme__item-group">
                <div transition:fade class="bem-scheme__block item">{item.block}</div>
                  {#if item.mods.length > 0}
                    {#each item.mods as blockMod, i}
                      <div transition:fade class="bem-scheme__block-mod item">{blockMod}</div>
                    {/each}
                  {/if}
                  {#if item.elems.length > 0}
                    {#each item.elems as elem, i}
                      <div transition:fade class="bem-scheme__element item">{elem.elem}</div>
                      {#if elem.mods.length > 0}
                        {#each elem.mods as elemMod, i}
                          <div transition:fade class="bem-scheme__element-mod item">{elemMod}</div>
                        {/each}
                      {/if}
                    {/each}
                  {/if}
              </div>
            {/each}
          {/if}
    </div>
  </div>
</main>

<style>
  .bem {
    display: flex;
    width: 100vw;
    height: 100vh;
  }
  .bem-editor {
    width: 100%;
    background-color: #222222;
  }
  .bem-scheme {
    width: 25rem;
    flex-shrink: 0;
    background-color: #ffffff;
    padding: 1rem;
    overflow-y: scroll;
  }
  .bem-editor__source {
    width: 100%;
    height: 100%;
    color: #252525;
    background-color: #ececec;
    font-size: 1rem;
    font-family: 'Roboto Mono', monospace;
    resize: none;
    border: none;
    padding: 1rem;
    white-space: pre;
    margin: 0;
  }
  .bem-scheme__error {
    border-bottom: 2px dashed rgb(190, 190, 190);
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 1rem;
  }
  .bem-scheme__title {
    color: #000000;
    margin: 0 0 1rem;
  }
  .bem-scheme__error-title {
    color: tomato;
    margin: 0 0 1rem;
  }
  .bem-scheme__item-group {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .item {
    padding: 0.25rem 0.5rem;
    margin-bottom: 0.25rem;
    border-radius: 4px;
  }
  .bem-scheme__block {
    color: #FFF;
    background-color: #000000;
  }
  .bem-scheme__block-mod {
    color: #000000;
    border: 1px solid #000000;
    margin-left: 1rem;
  }
  .bem-scheme__element {
    color: #FFF;
    background-color: #008A25;
    margin-left: 1rem;
  }
  .bem-scheme__element-mod {
    color: #008A25;
    border: 1px solid #008A25;
    margin-left: 2rem;
  }
  .bem-scheme__notbam-element {
    color: tomato;
    border: 1px solid tomato;
  }
</style>