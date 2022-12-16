<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link> |
      <div class="inline" v-if="store.connected">
        <router-link to="/newdoc">New Document</router-link> |
      </div>
      <router-link to="/about">About</router-link> | <ThemeSwitcher /> |
      <div class="inline" v-if="store.connected">
        <a href="#" @click="store.logout">Logout</a>
      </div>
      <div class="inline" v-else>
        <a href="#" @click="toggleLogin">Login</a>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import ThemeSwitcher from "./ThemeSwitcher.vue";
import { useAppwrite } from "@/store/appwrite";

const store = useAppwrite();

const emits = defineEmits(["toggleLogin"]);
const toggleLogin = () => emits("toggleLogin");
</script>

<style lang="less" scoped>
a:visited {
  color: inherit;
}
</style>
