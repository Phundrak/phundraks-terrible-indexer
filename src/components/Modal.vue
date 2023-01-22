<template>
  <div class="backdrop" @click.self="closeModal">
    <slot @close-modal="closeModal" />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["close-modal"]);

function closeModal() {
  emit("close-modal");
}
</script>

<style lang="less">
@import "@/assets/global.less";
@import "node_modules/nord/src/lesscss/nord";
</style>
