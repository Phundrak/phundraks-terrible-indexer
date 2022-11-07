<template>
  <div class="home">
    <h2>Search</h2>
    <form
      method="get"
      class="query-form center"
      accept="utf-8"
      @submit.prevent="submitInput"
    >
      <div class="query-input center flex">
        <input
          name="query"
          type="text"
          id="query"
          placeholder="Keyword"
          class="rounded"
          v-model="text"
          required
          @input="submitInput()"
          autocomplete="off"
        />
        <label for="keyword" id="query-label">Keyword</label>
      </div>
      <input
        type="submit"
        value="Search"
        id="submit"
        class="default-theme default-font rounded"
      />
    </form>
    <div class="results" v-if="documents.length">
      <ListDocs :documents="documents" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ListDocs from "@/components/ListDocs.vue";
import { useThrottleFn } from "@vueuse/shared";

export default defineComponent({
  name: "HomeView",
  data() {
    return {
      text: "",
      documents: [] as String[],
      error: null as any,
      submitInput: useThrottleFn(
        () => {
          if (this.text) {
            fetch(`http://leon:8000/search?query=${this.text}`)
              .then((res) => res.json())
              .then((data) => (this.documents = data))
              .catch((err) => (this.error = err));
          }
        },
        1000,
        true
      ),
    };
  },
  components: { ListDocs },
});
</script>

<style lang="less">
@import "@/assets/form.less";
</style>
