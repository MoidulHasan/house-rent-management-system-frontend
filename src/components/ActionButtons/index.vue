<template>
  <div class="question-sub-header col-1 md:col-6 flex justify-content-end">
    <Button :onClick="viewData" class="hidden md:block p-button-text p-1">
      <img :src="'/images/icons/actions/view.svg'" alt="" srcset="" />
    </Button>
    <Button @click="editData" class="hidden md:block p-button-text p-1">
      <img :src="'/images/icons/question/edit-question.svg'" alt="" srcset="" />
    </Button>
    <Button :onclick="deleteData" class="hidden md:block p-button-text p-1">
      <img
        :src="'/images/icons/question/delete-question.svg'"
        alt=""
        srcset=""
      />
    </Button>
    <Button class="block md:hidden p-button-text p-1 ellipsis-button">
      <i class="pi pi-ellipsis-v" />
    </Button>
  </div>
</template>

<script setup>
const emits = defineEmits(["deleteData", "viewData", "editData"]);

const deleteData = () => {
  emits("deleteData");
};

const viewData = () => {
  emits("viewData");
};

const editData = () => {
  emits("editData");
};
</script>

<style lang="scss" scoped></style>
