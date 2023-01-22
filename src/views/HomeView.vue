<template>
  <div class="home">
    <h2>Search</h2>
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
          :query-result="queryResult"
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
import type { QueryResult } from "@/composables/document";
import axios from "axios";

const queryResult = ref({} as QueryResult);
const error = ref(null as any);

const submitInput = async (text: string) => {
  if (text) {
    try {
      const { data } = await axios.get(`http://localhost:8000/search/${text}`);
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
