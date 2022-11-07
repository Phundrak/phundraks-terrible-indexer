<template>
  <div class="home">
    <h2>Search</h2>
    <Form
      method="get"
      btnText="Search"
      lblText="Keywords"
      loadingText="Searching..."
      queryType="text"
      @execute="submitInput"
    />
    <div class="results" v-if="documents.length">
      <ListDocs :documents="documents" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ListDocs from "@/components/ListDocs.vue";
import { useThrottleFn } from "@vueuse/shared";
import Form from "../components/Form.vue";

export default defineComponent({
  name: "HomeView",
  data() {
    return {
      text: "",
      documents: [] as String[],
      error: null as any,
      submitInput: useThrottleFn(
        (text) => {
          if (text) {
            fetch(`http://leon:8000/search?query=${text}`)
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
  components: { ListDocs, Form },
});
</script>
