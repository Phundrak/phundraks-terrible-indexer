<template>
  <div class="add-page">
    <h2>Add New Page</h2>
    <Form
      method="post"
      btnText="Add Document"
      loadingText="Adding document to database..."
      lblText="Document URL"
      queryType="url"
      @submit="addDocument"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Form from "../components/Form.vue";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default defineComponent({
  name: "AddPageView",
  data() {
    return {
      url: "",
      loading: false,
      ok: false,
      done: false,
    };
  },
  components: { Form },
  methods: {
    addDocument(query: string) {
      const options = {
        method: "POST",
      };
      console.log(`Submitting URL ${query}`);
      this.loading = true;
      fetch(`http://leon:8000/doc?url=${query}`, options)
        .then((res) => {
          console.log("Got response!");
          return res.status;
        })
        .then((res) => {
          this.loading = false;
          if (res == 200) {
            this.done = true;
            sleep(5000).then(() => "");
            this.done = false;
          }
        });
    },
  },
});
</script>
