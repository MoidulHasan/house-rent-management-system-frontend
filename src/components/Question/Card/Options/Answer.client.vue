<template>
  <div>
    <div v-if="option.includes('http')">
      <Image height="25" :preview="true" :src="option" />
    </div>

    <CommonTextFormula v-else :text="option" />
  </div>
</template>

<script setup>
import Image from "primevue/image";

const props = defineProps(["option"]);
</script>

<style lang="scss" scoped></style>
