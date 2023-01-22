<template>
  <div class="all-docs">
    <h2>All documents</h2>
    <div class="results" v-if="documents">
      <Suspense>
        <ListDocs
          :documents="documents"
          :spelling="undefined"
          @delete-doc="removeDocFromResults"
        />
        <template #fallback>Loading...</template>
      </Suspense>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import ListDocs from "@/components/ListDocs.vue";
import { useAppwrite } from "@/store/appwrite";
import type { Document } from "@/composables/document";
import axios from "axios";

const documents = ref({} as Document[]);
const error = ref(null as any);
const store = useAppwrite();

onMounted(async () => {
  try {
    const { data } = await axios({
      baseURL: store.endpoint,
      url: "/docs",
      headers: {
        "X-User-Auth": `${store.session.userId};${store.session.$id}`,
      },
    });
    documents.value = data;
  } catch (e: any) {
    error.value = e;
    console.debug(error);
  }
});

const removeDocFromResults = (doc: Document) => {
  console.log(`Removing document ${doc.doc}`);
  documents.value = documents.value.filter(
    (elem: Document) => elem.doc != doc.doc
  );
};
</script>
