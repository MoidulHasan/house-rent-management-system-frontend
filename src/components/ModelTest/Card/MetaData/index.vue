<template>
  <div class="meta-tag">
    <span class="meta-title">{{ dataKey }} : </span>
    <span class="meta-data"> {{ value }}</span>
  </div>
</template>

<script setup lang="ts">
// props
const props = defineProps<{
  dataKey: string;
  value: string;
}>();
</script>

<style lang="scss" scoped>
.meta-tag {
  padding-top: 0px;
  padding-bottom: 0px;
}
.meta-title {
  // height: 27px;

  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  // line-height: 27px;
  /* identical to box height */

  color: #616161;
}

.meta-data {
  // height: 30px;

  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  // line-height: 30px;
  /* identical to box height */

  color: #f58400;
}
</style>
