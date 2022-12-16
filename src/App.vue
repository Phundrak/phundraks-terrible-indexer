<template>
  <a class="skip-main rounded" href="#main">Skip to main content</a>
  <Header @toggleLogin="toggleLogin" />

  <h1>PTI – Phundrak’s Terrible Indexer</h1>

  <teleport to="#modals">
    <transition name="fade">
      <div v-if="showLogin">
        <Login @close-modal="toggleLogin" />
      </div>
    </transition>
  </teleport>

  <router-view v-slot="{ Component }">
    <transition name="fade-page">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Header from "./components/Header.vue";
import Login from "./components/Login.vue";

const showLogin = ref(false);

function toggleLogin() {
  showLogin.value = !showLogin.value;
}
</script>

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
