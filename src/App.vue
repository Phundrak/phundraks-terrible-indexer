<script setup lang="ts">
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
</script>

<template>
  <a class="skip-main rounded" href="#main">Skip to main content</a>
  <header>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <ThemeSwitcher />
    </nav>
  </header>

  <router-view v-slot="{ Component }">
    <transition name="fade-page">
      <component :is="Component" />
    </transition>
  </router-view>
  <!-- <Transition name="fade">
    <div id="main" tabindex="-1">
      <RouterView />
    </div>
  </Transition> -->
</template>

<style lang="less">
@import "@/assets/global.less";
@import "node_modules/nord/src/lesscss/nord";

#main {
  outline: none;
}

a.skip-main {
  left: -999px;
  position: absolute;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  z-index: 999;

  &:focus,
  &:active {
    color: @nord4;
    background-color: @nord0;
    left: -30%;
    top: auto;
    width: 30%;
    height: auto;
    overflow: auto;
    margin: 10px 35%;
    padding: 5px;
    border: 4px solid @nord4;
    text-align: center;
    font-size: 1.2em;
    z-index: 999;
  }
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
