<template>
  <div class="backdrop" @click.self="closeModal">
    <slot @close-modal="closeModal" />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["closeModal"]);

function closeModal() {
  emit("closeModal");
}
</script>

<style lang="less">
@import "@/assets/global.less";
@import "node_modules/nord/src/lesscss/nord";
</style>
