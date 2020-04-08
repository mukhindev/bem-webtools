export const sample =
`<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BEM-webtools</title>
</head>
<body>
  <div class="page">
    <header class="header">
      <img class="logo logo_place_header" src="" alt="">
      <h1 class="header__title">BEM-webtools<h1>
      <p class="header__subtitle">
        Веб утилиты для BEM
        <a class="header__link" href="#">Подробнее →</a>
      </p>
    </header>
    <section class="content">
      <h2 class="content__title">Секция 1</h2>
      <p class="content__text">Параграф 1</p>
      <p class="content__text">Параграф 2</p>
    </section>
    <section class="content content_theme_dark">
      <h2 class="content__title content__title_theme_dark">Секция 1</h2>
      <p class="content__text content__text_theme_dark">Параграф 1</p>
      <p class="content__text content__text_theme_dark">Параграф 2</p>
    </section>
    <footer class="footer">
      <img class="logo logo_place_footer" src="" alt="">
      <p class="footer__copyright">© 2020 Сергей Мухин (@mukhindev)</p>
    </footer>
  </div>
</body>
</html>`
