<template>
  <div>
    <Dialog
      header="Question"
      :closable="false"
      :draggable="false"
      v-model:visible="visible"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '50vw' }"
    >
      <div>
        <div class="question-title">
          {{ title }}
        </div>
        <img class="title-image" :src="imageSrc" alt="" srcset="" />
      </div>

      <template #footer>
        <Button
          label="Close"
          icon="pi pi-times"
          @click="closeModal"
          autofocus
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
const props = defineProps(["visible", "title", "imageSrc"]);
const emits = defineEmits(["onClose"]);

const closeModal = () => {
  emits("onClose");
};
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

.title-image {
  max-height: 200px;
}
</style>
