<template>
  <div class="home">
    <Form
      method="get"
      btnText="Search"
      lblText="Keywords"
      loadingText="Searching..."
      queryType="text"
      @submit="submitInput"
    />
    <div class="results" v-if="queryResult">
      <Suspense>
        <ListDocs
          :documents="queryResult.results"
          :spelling="queryResult.spelling_suggestion"
          @delete-doc="removeDocFromResults"
        />
        <template #fallback>Loading...</template>
      </Suspense>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ListDocs from "@/components/ListDocs.vue";
import Form from "@/components/Form.vue";
import { useAppwrite } from "@/store/appwrite";
import type { Document, QueryResult } from "@/composables/document";
import axios from "axios";

const queryResult = ref({} as QueryResult);
const error = ref(null as any);
const store = useAppwrite();

const submitInput = async (text: string) => {
  if (text) {
    try {
      const { data } = await axios.get(`${store.endpoint}/search/${text}`);
      queryResult.value = data;
    } catch (e: any) {
      error.value = e;
      console.log(error);
    }
  }
};

const removeDocFromResults = (doc: Document) => {
  console.log(`Removing document ${doc.doc}`);
  queryResult.value.results = queryResult.value.results.filter(
    (elem: Document) => elem.doc != doc.doc
  );
};
</script>
