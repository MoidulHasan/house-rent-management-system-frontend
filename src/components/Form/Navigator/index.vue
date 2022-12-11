<template>
  <div class="flex justify-content-between">
    <Button label="Submit" />
    <Button label="Submit" />
  </div>
</template>

<script setup lang="ts">
// define props
const props = defineProps<{
  totalSteps: number;
}>();

// define event
const emits = defineEmits<{
  (e: "pageChange"): number;
}>();

// States
const pageNumber = ref(1);

const nextPage = () => {
  pageNumber.value++;
};
const prevPage = () => {
  formPage.value--;
};
</script>

<style lang="scss" scoped></style>
