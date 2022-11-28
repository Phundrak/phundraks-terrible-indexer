<template>
  <div class="document" @click="toggleModal">
    <div class="flex-row">
      <h4 class="title flex-grow flex-v-centered">
        <a :href="document.doc" target="_blank">{{ document.title }}</a>
      </h4>
      <div class="score flex-v-centered">Score: {{ document.hits }}</div>
    </div>
    <div class="description">
      {{ document.description }}
    </div>
    <teleport to="#modals">
      <transition name="fade">
        <div v-if="showModal">
          <DocModal :document="document" @close-modal="toggleModal" />
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { Document } from "@/composables/document";
import DocModal from "./DocModal.vue";

export default defineComponent({
  components: { DocModal },
  data() {
    return {
      showModal: false,
    };
  },
  props: {
    document: {
      type: Object as PropType<Document>,
      required: true,
    },
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
  },
});
</script>
