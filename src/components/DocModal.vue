<template>
  <Modal @close-modal="closeModal">
    <div class="card container">
      <div v-if="loading">
        <Loader />
      </div>
      <div v-else>
        <div class="flex-col container" :key="props.document.doc">
          <h2 class="title">
            <a :href="props.document.doc">{{ props.document.title }}</a>
          </h2>
          <div class="description">
            <p>{{ props.document.description }}</p>
          </div>
          <div class="keywords">
            <p
              v-for="keyword in keywords"
              :key="keyword.keyword"
              :style="fontSize(keyword.rank)"
            >
              {{ keyword.keyword }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import Modal from "@/components/Modal.vue";
import Loader from "@/components/Loader.vue";
import type { RankedKeyword } from "@/composables/keywords";
import type { Document } from "@/composables/document";
import { useAppwrite } from "@/store/appwrite";
import axios from "axios";

const store = useAppwrite();

const loading = ref(true);
const keywords = ref([] as RankedKeyword[]);
const props = defineProps<{
  document: Document;
}>();

onMounted(async () => {
  console.log(props.document.online);
  let id = props.document.online
    ? props.document.doc
    : `${encodeURIComponent(props.document.doc)}`;
  try {
    const { data } = await axios.get(`${store.endpoint}/docs/${id}/keywords`);
    console.log(data);
    loading.value = false;
    keywords.value = data
      .sort((a: RankedKeyword, b: RankedKeyword) => a.rank < b.rank)
      .slice(0, 25);
  } catch (error) {
    console.log(`Error fetching keywords for ${props.document.doc}: ${error}`);
  }
});

const emits = defineEmits(["close-modal"]);

const closeModal = () => emits("close-modal");

const fontSize = (base: number) => {
  const size = Math.log2(base / 5) * 10;
  return `font-size: max(${size}px, 1rem)`;
};
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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  gap: 1rem;

  p {
    padding: 0;
    margin: 0;
    display: inline-block;
    gap: 1rem;
  }
}
</style>
