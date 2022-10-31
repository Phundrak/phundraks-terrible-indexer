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

  <Transition name="fade">
    <RouterView />
  </Transition>
</template>

<style lang="less">
@import 'assets/global.less';
@import '../node_modules/nord/src/lesscss/nord';

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
