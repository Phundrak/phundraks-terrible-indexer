<template>
  <div class="document">
    <div class="flex-row">
      <h4 class="title flex-grow flex-v-centered">
        <a :href="document.doc" target="_blank">{{ document.title }}</a>
      </h4>
      <div class="score flex-v-centered">Score: {{ document.hits }}</div>
    </div>
    <div class="description">
      {{ document.description }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Document } from "@/composables/document";
defineProps<{
  document: Document;
}>();
</script>
