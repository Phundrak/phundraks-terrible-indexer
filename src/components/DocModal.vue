<template>
  <Modal @close-modal="closeModal">
    <div class="card container">
      <div v-if="loading">
        <Loader />
      </div>
      <div v-else>
        <div class="flex-col container" :key="document.doc">
          <h2 class="title">
            <a :href="document.doc">{{ document.title }}</a>
          </h2>
          <div class="description">
            <p>{{ document.description }}</p>
          </div>
          <ul class="keywords flex-col" v-if="keywords">
            <li
              v-for="keyword in keywords"
              :key="keyword.keyword"
              class="flex-row"
            >
              <!-- {{ keyword.keyword }}: {{ keyword.rank }} hits -->
              <div>
                {{ keyword.keyword }}
              </div>
              <div>{{ keyword.rank }} hits</div>
            </li>
          </ul>
        </div>
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
      layout: {} as any,
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
      this.keywords = data
        .sort((a: RankedKeyword, b: RankedKeyword) => a.rank < b.rank)
        .slice(0, 15);
    } catch (error) {
      console.log(`Error fetching keywords for ${this.document.doc}: ${error}`);
    }
  },
  emits: ["closeModal"],
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    fontSize(base: number) {
      const size = Math.log2() * 2 * number;
      return `font-size: ${size}px`;
    },
  },
});
</script>

<style lang="less" scoped>
@import "@/assets/global.less";
@import "node_modules/nord/src/lesscss/nord";

ul {
  padding: 0;
  margin: 0;
  list-style: none;
  gap: 1rem;
}

li {
  .theme(color, fade(@nord3, 80%), fade(@nord4, 80%));
  gap: 4rem;
  justify-content: space-between;
  padding: 0;
  margin: 0;
  text-decoration: none;
  width: 100%;
}

.keywords {
  margin: 2rem auto;
}
</style>
