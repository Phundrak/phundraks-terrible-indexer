<script setup lang="ts">
import ThemeSwitcher from './components/ThemeSwitcher.vue';
</script>

<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <ThemeSwitcher />
    </nav>
  </header>

  <RouterView />
</template>

<style lang="less">
@import 'assets/global.less';
@import '../node_modules/nord/src/lesscss/nord';

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

body {
  .theme(background-color, @nord6, @nord1);
  transition: background-color 0.3s ease;
}

#app {
  text-align: center;
  .theme(color, @nord2, @nord6);
  .default-font;
  transition: color 0.3s ease;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    .theme(color, @nord1, @nord4);

    &.router-link-exact-active {
      color: @nord14;
    }
  }
}
</style>
