<template>
  <Modal @close-modal="closeModal">
    <div v-if="loading">
      <Loader />
    </div>
    <div v-else>
      <div class="flex-row" :key="document.doc">
        <h2>
          <a :href="document.doc">{{ document.title }}</a>
        </h2>
        <div>
          <p>{{ document.description }}</p>
        </div>
        <svg></svg>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { RankedKeyword } from "@/composables/keywords";
import type { Document } from "@/composables/document";
import axios from "axios";
import Modal from "@/components/Modal.vue";
import Loader from "@/components/Loader.vue";

export default defineComponent({
  components: { Loader, Modal },
  data() {
    return {
      loading: true,
      keywords: [{}] as [RankedKeyword],
    };
  },
  props: {
    document: {
      type: Object as PropType<Document>,
      required: true,
    },
  },
  async mounted() {
    let fetchUrl = `http://localhost:8000/keywords?doc=${this.document.doc}`;
    console.log(`Fetching keywords for ${fetchUrl}`);
    try {
      const { data } = await axios.get(fetchUrl);
      console.log(data);
      this.loading = false;
      return data;
    } catch (error) {
      console.log(`Error fetching keywords for ${this.document.doc}: ${error}`);
    }
  },
  emits: ["closeModal"],
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
  },
});
</script>
