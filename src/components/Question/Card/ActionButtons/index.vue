<template>
  <div class="question-sub-header col-1 md:col-6 flex justify-content-end">
    <Button :onClick="addToMcq" class="hidden md:block p-button-text p-1">
      <img src="/images/icons/question/add-to-mcq.svg" alt="" srcset="" />
    </Button>
    <Button @click="editQuestion" class="hidden md:block p-button-text p-1">
      <img src="/images/icons/question/edit-question.svg" alt="" srcset="" />
    </Button>
    <Button :onclick="questionDelete" class="hidden md:block p-button-text p-1">
      <img src="/images/icons/question/delete-question.svg" alt="" srcset="" />
    </Button>
    <Button class="block md:hidden p-button-text p-1 ellipsis-button">
      <i class="pi pi-ellipsis-v" />
    </Button>
  </div>
</template>

<script setup>
const emits = defineEmits(["deleteQuestion", "addToMcq", "editQuestion"]);

const questionDelete = () => {
  emits("deleteQuestion");
};

const addToMcq = () => {
  emits("addToMcq");
};

const editQuestion = () => {
  emits("editQuestion");
};
</script>

<style lang="scss" scoped></style>
