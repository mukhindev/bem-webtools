<template lang="pug">
  main.bem

    // РЕДАКТОР
    .bem-editor
      .bem-editor__clear.item.pointer(@click="clearHtml")
        i.fas.fa-trash-alt(class="mr-05")
        span Очистить
      textarea.bem-editor__source(
        :value="html"
        @input="updateHtml"
        spellcheck="false"
        placeholder="Введите или вставьте HTML код"
      )

    // СХЕМА BEM NESTED
    .bem-scheme(v-if="blocks")
      
      // БЛОКИ
      .bem-scheme__block-group(v-for="block in blocks")
        .bem-scheme__block-folder.item.pointer(@click="imports = bash(block.class)")
          i.fas.fa-folder-open(class="mr-05")
          span {{ block.folder }}
        .bem-scheme__block-file.item.pointer(@click="imports = block.imports")
          i.fab.fa-css3(class="mr-05")
          span {{ block.file }}

        // МОДИФИКАТОРЫ БЛОКОВ
        .bem-scheme__block-mod-group(v-for="mod, i in block.mods")
          .bem-scheme__block-mod-folder.item(v-if="i === 0")
            i.fas.fa-folder-open(class="mr-05")
            span {{ mod.folder }}
          .bem-scheme__block-mod-file.item
            i.fab.fa-css3(class="mr-05")
            span {{ mod.file }}

        // ЕЛЕМЕНТЫ БЛОКОВ
        .bem-scheme__element-group(v-for="element in block.elements")
          .bem-scheme__element-folder.item
            i.fas.fa-folder-open(class="mr-05")
            span {{ element.folder }}
          .bem-scheme__element-file.item
            i.fab.fa-css3(class="mr-05")
            span {{ element.file }}

          // МОДИФИКАТОРЫ ЕЛЕМЕНТОВ
          .bem-scheme__element-mod-group(v-for="mod, i in element.mods")
            .bem-scheme__element-mod-folder.item(v-if="i === 0")
              i.fas.fa-folder-open(class="mr-05")
              span {{ mod.folder }}
            .bem-scheme__element-mod-file.item
              i.fab.fa-css3(class="mr-05")
              span {{ mod.file }}
    
    // ОШИБКИ
    pre.bem-logs
      .bem-errors(v-if="errors")
        .bem-errors__item(v-for="e in errors")
          i.fas.fa-exclamation-triangle(class="mr-05")
          span {{ e.message }}
          span(v-if="e.class")  для класса "{{ e.class }}"
      .bem-imports(v-if="blocks")
        .bem-imports__item(v-for="item in imports") {{ item }}
</template>

<script>
import { parser } from '../modules/bem.js'

export default {
  name: 'BemScheme',
  components: { },
  data () {
    return {
      imports: [
        '// Выберете блок, чтобы узнать команды bash для создания папок',
        '// Выберете .css файл блока, чтобы узнать импорты'
      ]
    }
  },
  computed: {
    html () {
      return this.$store.getters.html
    },
    parser () {
      return parser(this.html)
    },
    errors () {
      if (this.parser.errors.length > 0) return this.parser.errors
      else return null
    },
    blocks () {
      if (this.parser.bem === null) return null
      else return this.parser.bem.blocks
    },
    bash () {
      return function (block) {
        if (this.parser.bem === null) return null
        const folders = this.parser.bem.blocks.find(el => el.class === block).folders
        if (folders.length > 0) return [`mkdir -p blocks/${block}/{${folders}}`]
        if (folders.length === 0) return [`mkdir -p blocks/${block}`]
      }
    }
  },
  methods: {
    updateHtml (e) {
      this.$store.commit('updateHtml', e.target.value)
    },
    clearHtml () {
      this.$store.commit('updateHtml', '')
    },
    selectBlock (block) {
      this.imports = this.bash(block)
    }
  }
}
</script>

<style>
  .bem-editor {
    position: fixed;
    top: 0;
    bottom: 50%;
    left: 0;
    right: 25rem;
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
  .bem-editor__clear {
    position: absolute;
    z-index: 2;
    top: 1rem;
    right: 1.5rem;
    background-color: #d8d8d8;
    border: 1px solid #d8d8d8;
    ;
  }
  .bem-scheme {
    overflow-y: scroll;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    width: 25rem;
    background-color: #ffffff;
    padding: 1rem;
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
    border: 1px solid #D16969;
    background-color: #D16969;
  }
  .bem-scheme__block-mod-file {
    margin-left: 1rem;
    color: #000000;
    border: 1px dashed #969696;
  }
  .bem-scheme__element-folder {
    color: rgb(0, 0, 0);
    border: 1px solid #4EC9B0;
    background-color: #4EC9B0;
  }
  .bem-scheme__element-file {
    margin-left: 1rem;
    color: #000000;
    border: 1px dashed #969696;
  }
  .bem-scheme__element-mod-folder {
    color: #000000;
    border: 1px solid #D7BA7D;
    background-color: #D7BA7D;
  }
  .bem-scheme__element-mod-file {
    margin-left: 1rem;
    color: #000000;
    border: 1px dashed #969696;
  }
  .item {
    padding: 0.25rem 0.5rem;
    margin-bottom: 0.25rem;
    border-radius: 4px;
  }
  .bem-logs {
    overflow-y: scroll;
    position: fixed;
    margin: 0;
    bottom: 0;
    left: 0;
    right: 25rem;
    height: 50%;
    background-color: #1E1E1E;
    padding: 1rem;
  }
  .bem-errors {
    margin-bottom: 1rem;
  }
  .bem-errors__item {
    color: #D16969;
    margin: 0.25rem;
  }
  .bem-imports__item {
    color: #9CDCFE;
    margin: 0.25rem;
  }
</style>
