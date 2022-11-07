<template>
  <div class="add-page">
    <h2>Add New Page</h2>
    <form
      method="post"
      class="query-form center"
      accept="utf-8"
      @submit.prevent="addDocument"
    >
      <div class="query-input center flex">
        <input
          class="rounded center"
          name="documentPath"
          type="url"
          id="query"
          placeholder="Document URL"
          v-model="url"
          required
          autocomplete="off"
        />
        <label for="documentPath" id="query-label">Document URL</label>
      </div>
      <input
        type="submit"
        value="Add Document"
        id="submit"
        class="default-theme default-font rounded"
      />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "AddPageView",
  data() {
    return {
      url: "",
    };
  },
  methods: {
    addDocument() {
      const options = {
        method: "POST",
      };
      console.log(`Submitting URL ${this.url}`);
      fetch(`http://leon:8000/doc?url=${this.url}`, options)
        .then((res) => {
          console.log("Got response!");
          return res;
        })
        .then((res) => console.log(`${this.url} done!`, res));
    },
  },
});
</script>

<style lang="less">
@import "@/assets/form.less";
</style>
