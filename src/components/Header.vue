<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/newdoc">New Document</router-link> |
      <router-link to="/about">About</router-link> |
      <ThemeSwitcher />
    </nav>
  </header>
</template>

<script setup lang="ts">
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
</script>

<style lang="less">
a:visited {
  color: inherit;
}
</style>
