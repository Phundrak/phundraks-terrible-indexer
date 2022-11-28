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
