<template lang="pug">
  .error
    .error__box
      h1.error__title 404
      router-link.error__link(to="/") на главную
</template>

<style scoped>
  .error {
    width: 100vw;
    height: 100vh;
    display: flex;
  }
  .error__box {
    margin: auto;
  }
</style>