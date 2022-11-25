<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/newdoc">New Document</router-link> |
      <router-link to="/about">About</router-link> | <ThemeSwitcher /> |
      <a href="#" @click="toggleLogin">Login</a>
    </nav>
  </header>
</template>

<script lang="ts">
import ThemeSwitcher from '@/components/ThemeSwitcher.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',
  emits: ['toggleLogin'],
  methods: {
    toggleLogin() {
      console.log('Emitting login');
      this.$emit('toggleLogin');
    },
  },
  components: { ThemeSwitcher },
});
</script>

<style lang="less" scoped>
a:visited {
  color: inherit;
}
</style>
