<template>
  <div>
    <span v-html="questionTitle" class="question-title" />
  </div>
</template>

<script setup lang="ts">
import { Marked } from "@ts-stack/markdown";

// props
const props = defineProps<{
  title: string;
}>();

// states
const questionTitle = ref(null);

// methods
const formatTitle = (title: string) => {
  let flag = false;
  for (let i = 0; i < title.length; i++) {
    if (title[i] === "$" && title[i + 1] === "$") {
      if (!flag) {
        title =
          title.slice(0, i) +
          "<math-field read-only class='inline mx-1'> " +
          title.slice(i + 2, title.length);
        flag = true;
      } else {
        title =
          title.slice(0, i) +
          " </math-field> " +
          title.slice(i + 2, title.length - 1);
      }
    }
  }

  return title;
};

onMounted(() => {
  questionTitle.value = Marked.parse(formatTitle(props.title));
  questionTitle.value = questionTitle.value.slice(
    3,
    questionTitle.value.length - 5
  );

  console.log(questionTitle.value);
});
</script>

<style lang="scss" scoped>
.question-title {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  /* font-size: 20px; */
  font-size: 1.25rem;
  line-height: 30px;

  display: flex;
  align-items: center;

  color: #3e3e3e;
}
</style>
