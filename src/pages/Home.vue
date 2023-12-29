<script setup lang="ts"></script>

<template>
  <header class="header">
    <h1 class="header__title">Vue Posts</h1>
    <nav class="header__nav">
      <router-link to="/posts"><button class="header__button">Posts</button></router-link>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.header {
  margin-top: 50px;
  display: flex;
  justify-content: space-around;
  padding: 30px;
  border: 1px solid black;

  &__title {
    font-size: 30px;
  }

  &__nav {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__button {
    padding: 10px;
    cursor: pointer;
  }
}
</style>
