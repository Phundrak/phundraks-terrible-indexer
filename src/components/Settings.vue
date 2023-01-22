<template>
  <form class="card flex-col" accept="utf-8" @submit.prevent="setSettings">
    <h2>Settings</h2>
    <Transition name="fade-grow">
      <p class="error" v-if="error"></p>
    </Transition>
    <div class="container flex-col">
      <div class="flex-col top-bottom-margin-1rem box-sizing-border">
        <h4>Endpoint</h4>
        <input
          class="input-text"
          name="endpoint"
          type="text"
          v-model="endpoint"
          placeholder="https://pti.example.com/api"
          required
        />
      </div>
      <div
        class="flex-row top-bottom-margin-1rem box-sizing-border flex-gap-1rem top-bottom-margin-1rem"
      >
        <button
          class="form-button cancelbtn flex-v-centered"
          @click="closeModal"
        >
          Cancel
        </button>
        <button class="form-button flex-v-centered" type="submit">Apply</button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAppwrite } from "@/store/appwrite";
const store = useAppwrite();

const error = ref(null);
const emit = defineEmits(["close-modal"]);
const endpoint = ref(store.endpoint);

const closeModal = () => emit("close-modal");
const setSettings = () => {
  console.debug("Setting user preferences");
  store.setEndpoint(endpoint.value);
  console.debug("Done!");
  closeModal();
};
</script>

<style scoped lang="less">
@import "@/assets/global.less";
@import "node_modules/nord/src/lesscss/nord";

h4 {
  .default-font();
}
</style>
