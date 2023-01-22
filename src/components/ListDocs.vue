<template>
  <div v-if="spelling_suggestion && using_suggestion">
    Using search request <strong>{{ spelling_suggestion }}</strong>
  </div>
  <div v-else-if="spelling_suggestion">
    Suggested search: <strong>{{ spelling_suggestion }}</strong>
  </div>
  <TransitionGroup tag="ul" name="fade" class="docs">
    <li v-for="doc in documents" :key="doc.doc" class="rounded">
      <Doc @doc-deleted="deleteDoc(doc)" :document="doc" />
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
import type { QueryResult, Document } from "@/composables/document";
import { computed } from "vue";
import Doc from "@/components/Doc.vue";
const props = defineProps<{
  queryResult: QueryResult;
}>();
const emits = defineEmits(["delete-doc"]);

const spelling_suggestion = computed(
  () => props.queryResult.spelling_suggestion
);
const using_suggestion = computed(() => props.queryResult.using_suggestion);
const documents = computed(() => props.queryResult.results);

const deleteDoc = (doc: Document) => emits("delete-doc", doc);
</script>

<style lang="less" scoped>
@import "@/assets/global.less";
@import "node_modules/nord/src/lesscss/nord";

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
