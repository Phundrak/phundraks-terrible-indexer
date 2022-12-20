<template>
  <form
    :method="method"
    class="query-form center"
    accept="utf-8"
    @submit.prevent="submit"
  >
    <div class="query-input center flex">
      <input
        class="rounded center"
        name="query"
        :type="queryType"
        id="query"
        :placeholder="lblText"
        v-model="query"
        required
        autocomplete="off"
      />
      <label for="query" id="query-label">{{ lblText }}</label>
    </div>
    <input
      type="submit"
      :value="loading ? '…' : btnText"
      id="submit"
      class="generic-button"
    />
  </form>
  <Transition name="fade">
    <div class="progress">
      <div v-if="loading">
        <p>{{ loadingText }}</p>
        <LoaderVue class="center" />
      </div>
      <div v-else-if="done"><p>Done!</p></div>
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoaderVue from "@/components/Loader.vue";
export default defineComponent({
  name: "DocumentForm",
  props: {
    method: String,
    btnText: String,
    lblText: String,
    loadingText: String,
    queryType: String,
    loading: Boolean,
    done: Boolean,
  },
  data() {
    return {
      query: "",
    };
  },
  emits: ["submit"],
  methods: {
    submit() {
      this.$emit("submit", this.query);
    },
  },
  components: { LoaderVue },
});
</script>

<style lang="less">
@import "@/assets/global.less";
@import "node_modules/nord/src/lesscss/nord";

#query-label {
  text-align: left;
  padding: 0.2rem;
  .theme(color, @nord3, @nord4);
}

#query {
  width: 90%;
  padding: 1rem;
  border: none;
  .theme(background-color, @nord4, @nord3);
  .theme(color, @nord2, @nord6);

  & + #query-label {
    opacity: 0;
    transition: opacity @transition-medium ease;
  }
  &:not(:placeholder-shown) + #query-label {
    opacity: 1;
    transition: opacity @transition-medium ease;
  }
}
#submit {
  border: none;
  padding: 1rem;
  .theme(background-color, @nord4, @nord3);
  transition: background-color @transition-medium ease,
    color @transition-medium ease;
}
</style>
