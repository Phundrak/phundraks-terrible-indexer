<template>
  <button @click="toggleDark()" class="default-theme default-font">
    {{ isDark ? 'Light' : 'Dark' }}
  </button>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark({
  selector: 'html',
  attribute: 'theme',
  valueDark: '',
  valueLight: 'light',
});

const toggleDark = useToggle(isDark);
</script>

<style lang="less" scoped>
button {
  border: none;
  font-weight: bold;
  font-size: 1rem;
  text-decoration: underline;
  transition: color 0.3s ease, background 0.3s ease;
}
</style>
