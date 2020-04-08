<template lang="pug">
  main.bem
    .bem-editor
      textarea(
        :value="html"
        @input="updateHtml"
        class="bem-editor__source"
        spellcheck="false"
        placeholder="Введите или вставьте HTML код"
      )
    .bem-scheme
      .bem-scheme__error(v-if="result.ok && result.notbem.length > 0")
        .bem-scheme__error-title Неверно используемые элементы и модификаторы &#9888;
        .bem-scheme__notbam-item.item(
          v-for="item in result.notbem"
        ) {{ item }}
      .bem-scheme__good(v-if="result.ok && result.bem.length > 0")
        .bem-scheme__good-title Схема BEM nested
        .bem-scheme__block-group(v-for="item in result.bem")
          .bem-scheme__block-folder.item
            i.fas.fa-folder-open(class="mr-05")
            span {{ item.block }}
          .bem-scheme__block-file.item
            i.fab.fa-css3(class="mr-05")
            span {{ item.block }}.css
          .bem-scheme__block-mod-group(v-for="mod, i in item.mods")
            .bem-scheme__block-mod-folder.item(v-if="i === 0")
              i.fas.fa-folder-open(class="mr-05")
              span _{{ mod | onlyModKey }}
            .bem-scheme__block-mod-file.item
              i.fab.fa-css3(class="mr-05")
              span {{ mod }}.css
          .bem-scheme__element-group(v-for="elem in item.elems")
            .bem-scheme__element-folder.item
              i.fas.fa-folder-open(class="mr-05")
              span __{{ elem.elem | onlyElement }}
            .bem-scheme__element-file.item
              i.fab.fa-css3(class="mr-05")
              span {{ elem.elem }}.css
            .bem-scheme__element-mod-group(v-for="mod, i in elem.mods")
              .bem-scheme__element-mod-folder.item(v-if="i === 0")
                i.fas.fa-folder-open(class="mr-05")
                span _{{ mod | onlyModKey }}
              .bem-scheme__element-mod-file.item
                i.fab.fa-css3(class="mr-05")
                span {{ mod }}.css
</template>

<script>
import { parser } from '../modules/bem.js'

export default {
  name: 'BemScheme',
  components: { },
  computed: {
    html () {
      return this.$store.getters.html
    },
    result () {
      return parser(this.html)
    }
  },
  methods: {
    updateHtml (e) {
      this.$store.commit('updateHtml', e.target.value)
    }
  },
  filters: {
    onlyElement: function (value) {
      if (!value) return ''
      return value.replace(/^.*?__/, '')
    },
    onlyModKey: function (value) {
      if (!value) return ''
      return value.replace(/^.*?(__).*?_|^.*?_|_.*?$/g, '')
    }
  }
}
</script>

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
  .bem-scheme__good {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .bem-scheme__good-title {
    color: #000000;
    margin: 0 0 1rem;
  }
  .bem-scheme__error-title {
    color: tomato;
    margin: 0 0 1rem;
  }
  .bem-scheme__block-group {
    margin-bottom: 2rem;
    padding-left: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
  }
  .bem-scheme__block-group::before {
    content: '';
    display: block;
    position: absolute;
    margin-top: 0.8rem;
    left: 0;
    top: 0;
    border: 2px solid rgba(0, 0, 0, 0.205);
    border-right: none;
    border-radius: 8px 0 0 8px;
    width: 8px;
    height: calc(100% - 1.2rem);
    transition: border 0.25s;
  }
  .bem-scheme__block-group:hover::before {
    border: 2px solid rgb(0, 0, 0);
    border-right: none;
  }
  .bem-scheme__block-mod-group {
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .bem-scheme__element-group {
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .bem-scheme__element-mod-group {
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .item {
    padding: 0.25rem 0.5rem;
    margin-bottom: 0.25rem;
    border-radius: 4px;
  }
  .bem-scheme__block-folder {
    color: #FFF;
    border: 1px solid #000000;
    background-color: #000000;
  }
  .bem-scheme__block-file {
    margin-left: 1rem;
    color: #000000;
    border: 1px dashed rgb(150, 150, 150);
  }
  .bem-scheme__block-mod-folder {
    color: #000000;
    border: 1px solid #000000;
  }
  .bem-scheme__block-mod-file {
    margin-left: 1rem;
    color: #000000;
    border: 1px dashed rgb(150, 150, 150);
  }
  .bem-scheme__element-folder {
    color: #FFF;
    border: 1px solid #008A25;
    background-color: #008A25;
  }
  .bem-scheme__element-file {
    margin-left: 1rem;
    color: #008A25;
    border: 1px dashed rgb(138, 190, 152);
  }
  .bem-scheme__element-mod-folder {
    color: #008A25;
    border: 1px solid #008A25;
  }
  .bem-scheme__element-mod-file {
    margin-left: 1rem;
    color: #008A25;
    border: 1px dashed rgb(138, 190, 152);
  }
  .bem-scheme__notbam-item {
    color: tomato;
    border: 1px solid tomato;
  }
</style>
