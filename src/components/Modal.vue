<template>
  <div class="backdrop" @click.self="closeModal">
    <slot @closeModal="" />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["closeModal"]);

function closeModal() {
  emit("closeModal");
}
</script>

<style lang="less" scoped>
@import "@/assets/global.less";
@import "node_modules/nord/src/lesscss/nord";
</style>
