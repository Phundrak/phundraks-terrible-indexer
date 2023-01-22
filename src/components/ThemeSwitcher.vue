<template>
  <button @click="toggleDark()" class="default-theme default-font">
    {{ isDark ? "Light" : "Dark" }} Theme
  </button>
</template>

<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark({
  selector: "html",
  attribute: "theme",
  valueDark: "",
  valueLight: "light",
});

const toggleDark = useToggle(isDark);
</script>

<style lang="less" scoped>
@import "@/assets/global.less";
button {
  border: none;
  font-weight: bold;
  font-size: 1rem;
  text-decoration: underline;
  transition: color @transition-medium ease, background @transition-medium ease;
  cursor: pointer;
  padding: 0;
}
</style>
