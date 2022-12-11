<template>
  <div class="grid">
    <div class="col-12 mt-32">
      <p class="input-label">*Question Title</p>
      <Editor
        @text-change="questionTitleChangeHandler"
        v-model="questionTitle"
        editorStyle="height: 90px"
      >
        <template #toolbar>
          <span class="ql-formats">
            <button class="ql-bold"></button>
            <button class="ql-italic"></button>
            <button class="ql-underline"></button>
            <button class="ql-formula"></button>
          </span>
        </template>
      </Editor>

      <QuestionFormQuestionTitleImageUpload
        @image-change="questionImageChangeHandler"
      />
    </div>
  </div>
</template>

<script setup>
import katex from "katex";
import("katex/dist/katex.min.css");

// Event
const emits = defineEmits(["titleChange"]);

// states
const questionTitle = ref(null);

// methods
const questionTitleChangeHandler = (event) => {
  emits("titleChange", event.htmlValue);
};

const questionImageChangeHandler = (image) => {
  console.log(image);
};

onMounted(() => {
  window.katex = katex;
});
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
