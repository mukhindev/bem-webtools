<script>
import { parser } from './bem.js'

let html = ''
$: result = parser(html)
</script>

<main>
  <div class="container">
    <div class="grid">
      <div class="col col-6">
        <textarea
          class="source"
          bind:value={ html }
          placeholder="Введите или вставьте HTML код"
        ></textarea>
      </div>
      <div class="col col-6 h-100">
        <pre class="result">{ result.message }</pre>
      </div>
    </div>
  </div>
</main>

<style>
  .container {
    height: 100vh;
  }
  .grid {
    height: 100%;
  }
  .col {
    height: 100%;
    position: relative;
  }
  textarea {
    resize: none;
  }
  .source {
    width: 100%;
    height: 100%;
  }
  .h-100 {
    height: 100%;
  }
</style>