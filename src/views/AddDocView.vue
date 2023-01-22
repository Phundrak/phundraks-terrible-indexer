<template>
  <div class="add-doc">
    <div class="add-doc">
      <h2>Add new local documents</h2>
      <form
        class="query-form center"
        method="post"
        @submit.prevent="uploadDocuments"
      >
        <div id="input-files">
          <label for="files">Select files to upload</label>
          <input
            id="files"
            name="files"
            type="file"
            multiple="true"
            accept=".pdf, .txt, .html"
            ref="files"
            @change="listFiles($event)"
          />
        </div>
        <input
          class="generic-button"
          type="submit"
          value="Upload"
          id="submit"
        />
      </form>
      <TransitionGroup
        tag="ul"
        name="fade"
        class="docs flex-col"
        v-if="list_files"
      >
        <li
          v-for="file in list_files"
          :key="file.file.name"
          class="rounded flex-row file"
        >
          <div class="filename">
            {{ file.file.name }}
          </div>
          <div class="status">
            {{ file.status }}
          </div>
        </li>
      </TransitionGroup>
    </div>
    <h2>or</h2>
    <div class="add-page">
      <h2>Add new online documents</h2>
      <Form
        method="post"
        btnText="Add Document"
        loadingText="Adding document to database..."
        lblText="Document URL"
        queryType="url"
        :loading="loading"
        :done="done"
        @submit="addOnlineDocument"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Form from "../components/Form.vue";
import { useAppwrite } from "@/store/appwrite";
import { newOfflineDocument, newOnlineDocument } from "@/composables/document";

const store = useAppwrite();

let loading = ref(false);
let error = ref(null as any);
let data = ref(null as any);
const done = ref(false);
const files = ref(null as any);
const list_files = ref([] as { file: File; status: String }[]);

const uploadDocuments = () => {
  list_files.value.forEach((elem) => {
    elem.status = "Uploading";
    newOfflineDocument(
      elem.file,
      store.endpoint,
      `${store.session.userId};${store.session.$id}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        elem.status = "Uploaded";
      })
      .catch((error) => (elem.status = `Failed: ${error}`));
  });
};

const listFiles = (e: any) => {
  const target = e.target as HTMLInputElement;
  list_files.value = Array();
  console.log(target);
  if (target.files) {
    for (var i = 0; i < target.files.length; i++) {
      list_files.value.push({ file: target.files[i], status: "Ready" });
      console.log(target.files[i]);
    }
  }
};

const addOnlineDocument = (url: string) => {
  ({
    isFetching: loading,
    data,
    error: error,
  } = newOnlineDocument(
    url,
    store.endpoint,
    `${store.session.userId};${store.session.$id}`
  ));
  console.debug("Loading:", loading);
  console.debug("Data:", data);
  console.debug("Error:", error);
};
</script>

<style lang="less" scoped>
@import "@/assets/global.less";
@import "node_modules/nord/src/lesscss/nord";

.docs {
  padding: 0;
  margin: 0 auto 2rem auto;
  width: 85%;
  max-width: 50rem;
  gap: 0.5rem;
}

.file {
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  background-color: @nord3;
}

#input-files {
  width: 100%;
  line-height: 3rem;
  background: @nord3;
  margin: 0 1rem;
  .rounded();
}

label[for="files"] {
  cursor: pointer;
  .rounded();
  .default-font();
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  height: 100%;
  width: 100%;
}

input[type="file"] {
  position: absolute;
  display: none;
  height: 0;
  padding: 0;
  opacity: 0;
}
</style>
