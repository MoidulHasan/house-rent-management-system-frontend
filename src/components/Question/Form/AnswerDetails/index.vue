<template>
  <div class="grid">
    <div class="col-12 mt-32">
      <p class="input-label">*Answer Details</p>
      <Editor v-model="answer" editorStyle="height: 119px;" />
    </div>
  </div>
</template>

<script setup>
const answer = ref();
</script>

<style lang="scss" scoped>
.input-label {
  height: 27px;

  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  /* identical to box height */

  display: flex;
  align-items: center;

  color: #3e3e3e;
  margin-bottom: 8px;
}

.mt-32 {
  margin-top: 32px;
}
</style>
