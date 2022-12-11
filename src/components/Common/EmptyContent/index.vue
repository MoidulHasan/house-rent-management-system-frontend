<template>
  <div :class="'empty-card grid'">
    <div class="col-12 flex align-items-end justify-content-center">
      <img
        width="200"
        height="200"
        src="/images/icons/box/empty2.svg"
        alt=""
        srcset=""
      />
    </div>
    <div class="col-12 flex justify-content-center">
      <h1 class="text-6xl font-bold">Sorry, No Content Found!!!</h1>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["Length", "Index"]);
</script>

<style scoped>
.empty-card {
  min-height: 70vh;
  padding: 32px;
  background: #fafafe;
  border-radius: 12px;
}
</style>
