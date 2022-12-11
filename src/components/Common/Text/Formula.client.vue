<template>
  <div>
    <!-- <span v-for="txt in text.split('$$').join('# #').split('#')" :key="txt">
      <math-field
        class="inline"
        v-if="txt.includes('$$')"
        read-only
        id="formula"
      >
        {{ txt + " " }}
      </math-field>

      <span v-else>{{ txt }}</span>
    </span> -->

    <math-field
      class="inline"
      v-if="text.includes('$$')"
      read-only
      id="formula"
    >
      {{ text + " " }}
    </math-field>

    <span v-else>{{ text }}</span>
  </div>
</template>

<script setup>
const props = defineProps(["text"]);
</script>

<style lang="scss" scoped></style>
