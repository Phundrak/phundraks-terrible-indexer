<template>
  <div class="document">
    <div class="flex-row">
      <h4 class="title flex-grow flex-v-centered">
        <a :href="props.document.url" target="_blank">{{
          props.document.title
        }}</a>
      </h4>
      <div class="score flex-v-centered">Score: {{ props.document.hits }}</div>
    </div>
    <div class="flex-row buttons">
      <button class="generic-button" @click="toggleModal">
        <i class="phunic-info"></i> Details
      </button>
      <button class="generic-button" @click="deleteDoc" v-if="store.connected">
        <i class="phunic-bin" />
        <div class="inline" v-if="deleting">Deleting...</div>
        <div class="inline" v-else>Delete</div>
      </button>
    </div>
    <div class="description">
      {{ props.document.description }}
    </div>
    <teleport to="#modals">
      <transition name="fade">
        <div v-if="showModal">
          <DocModal :document="props.document" @close-modal="toggleModal" />
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { deleteDocument, type Document } from "@/composables/document";
import DocModal from "./DocModal.vue";
import { useAppwrite } from "@/store/appwrite";

const store = useAppwrite();
const showModal = ref(false);
const deleting = ref(false);

const props = defineProps<{
  document: Document;
}>();
const emits = defineEmits(["docDeleted"]);

const toggleModal = () => {
  showModal.value = !showModal.value;
};

const deleteDoc = () => {
  deleting.value = true;
  deleteDocument(
    props.document,
    "http://localhost:8000",
    `${store.session.userId};${store.session.$id}`
  )
    .then((res: any) => {
      console.log(`Deletion of ${props.document.doc}: ${res}`);
    })
    .then((res) => {
      console.log(`Deletion of ${props.document.doc}: ${res}`);
    })
    .catch((e: any) => {
      console.log(`Error deleting ${props.document.doc}: ${e}`);
    });
  deleting.value = false;
  emits("docDeleted");
};
</script>

<style lang="less" scoped>
@import "@/assets/fonts.less";

.buttons {
  width: 90%;
  margin: 0 auto;
  flex-wrap: nowrap;
  justify-content: space-around;
  padding: 1rem;
  gap: 1rem;

  button {
    border: none;
    height: 3rem;
    width: 100%;
  }
}
</style>
