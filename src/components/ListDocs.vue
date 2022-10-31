<template>
  <ul class="docs">
    <li v-for="doc in documents" :key="doc" class="rounded">
      <a :href="doc" class="">{{ doc }}</a>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ListDocs',
  props: ['documents'],
});
</script>

<style lang="less" scoped>
@import '../assets/global.less';
@import '../../node_modules/nord/src/lesscss/nord';

ul {
  .flex-col();
  text-align: left;
  margin: 0 auto;
  padding: 0;
  max-width: 40rem;
}

a,
a:visited,
li {
  .theme(background-color, @nord4, @nord3);
}

li {
  list-style: none;
  padding: 1rem;
  margin: 0.5rem;
}
</style>
