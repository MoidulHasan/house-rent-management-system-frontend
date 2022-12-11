<template>
  <div>
    <h5 class="label">
      <span v-if="required" class="text-red-600">*</span> Please Select
      Curriculum
    </h5>
    <Dropdown
      v-model="selectedCurriculum"
      :options="curriculumStore.curriculums"
      :loading="loadingState"
      @change="curriculumChangeHandler"
      optionLabel="name"
      optionValue="id"
      placeholder="Select a Curriculum"
      class="w-full"
    />
  </div>
</template>

<script setup lang="ts">
import { useStore } from "~~/src/stores/store";
import { useCurriculumStore } from "~/stores/curriculum.store";
import CurriculumService from "~/services/Curriculum.Service";
import { useToast } from "primevue/usetoast";

// define props
const props = defineProps<{
  required?: boolean;
  value?: number;
  submit?: boolean;
  addValueChangeHandler?: boolean;
}>();

// define emits
const emits = defineEmits<{
  (e: "valueSubmit", curriculum: number);
}>();

// define hooks
const curriculumStore = useCurriculumStore();
const Curriculum = new CurriculumService();
const toast = useToast();

// define states
const selectedCurriculum = ref();
const loadingState = ref();

// methods
onMounted(async () => {
  loadingState.value = true;

  const curriculums = await Curriculum.getAll();

  if (curriculums.success) {
    curriculumStore.setCurriculum(curriculums.data);
  } else {
    toast.add({
      severity: "error",
      summary: "Failed",
      detail: curriculums.message,
      life: 3000,
    });
  }
  loadingState.value = false;
});

onUpdated(() => {
  if (props.submit) {
    emits("valueSubmit", selectedCurriculum.value);
  }
});

const curriculumChangeHandler = () => {
  if (props.addValueChangeHandler === true)
    emits("valueSubmit", selectedCurriculum.value);
};
</script>

<style scoped>
.label {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;

  display: flex;
  align-items: center;

  color: #3e3e3e;
}
</style>
