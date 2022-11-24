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
      <ListDocs :query-result="queryResult" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useThrottleFn } from "@vueuse/shared";
import ListDocs from "../components/ListDocs.vue";
import Form from "../components/Form.vue";
import type { QueryResult } from "@/composables/document";

import axios from "axios";

export default defineComponent({
  name: "HomeView",
  data() {
    return {
      queryResult: {} as QueryResult,
      error: null as any,
      submitInput: useThrottleFn(
        async (text) => {
          if (text) {
            try {
              const { data } = await axios.get(
                `http://leon:8000/search/${text}`
              );
              this.queryResult = data;
            } catch (error) {
              console.log(error);
            }
          }
        },
        1000,
        true
      ),
    };
  },
  components: { ListDocs, Form },
});
</script>
