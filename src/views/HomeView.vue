<template>
  <div class="home">
    <h1>PTI</h1>
    <h2>Phundrak’s Terrible Indexer</h2>
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
          @enter="submitInput()"
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
    <!-- <div class="results" v-if="documents.length > "></div> -->
    <div class="results" v-if="documents.length">
      <ListDocs :documents="documents" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListDocs from '../components/ListDocs.vue';

export default defineComponent({
  name: 'HomeView',
  data() {
    return {
      text: '',
      documents: [] as String[],
      error: null as any,
    };
  },
  methods: {
    submitInput() {
      console.log(this.text);
      fetch(`http://leon:8000/keyword?keyword=${this.text}`)
        .then((res) => res.json())
        .then((data) => (this.documents = data))
        .catch((err) => (this.error = err));
    },
  },
  components: { ListDocs },
});
</script>

<style lang="less">
@import '../assets/global.less';
@import '../../node_modules/nord/src/lesscss/nord';

.query-form {
  .flex-row;
  align-items: flex-end;
  width: 70%;
  max-width: 20rem;
  padding: 2rem;

  @media (max-width: 30rem) {
    .flex-col;
    align-items: center;
  }

  .query-input {
    flex-grow: 1;
    padding: 0 1rem;
    flex-direction: column-reverse;
    align-content: flex-start;

    @media (max-width: 30rem) {
      padding: 1rem;
    }
  }

  #query-label {
    text-align: left;
    padding: 0.2rem;
    .theme(color, @nord3, @nord4);
  }

  #query {
    padding: 1rem;
    border: none;
    .theme(background-color, @nord4, @nord3);
    .theme(color, @nord2, @nord6);

    & + #query-label {
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:not(:placeholder-shown) + #query-label {
      opacity: 1;
      transition: opacity 0.3s ease;
    }
  }

  #submit {
    border: none;
    padding: 1rem;
    .theme(background-color, @nord4, @nord3);
    transition: background-color 0.3s ease, color 0.3s ease;
  }
}
</style>
