<template>
  <div>
    <Dialog
      header="Add To MCQ Set"
      v-model:visible="addToMcq"
      :draggable="false"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '30vw' }"
      @hide="closeModal"
    >
      <div class="grid">
        <div class="col-12">
          <Dropdown
            v-model="selectedMcqSet"
            :options="McqSetStore.mcqSets"
            optionLabel="name"
            optionValue="id"
            placeholder="Select a MCQ Set"
            class="w-12"
          />
        </div>
        <div class="col-12">
          <Dropdown
            v-model="selectedInstitute"
            :options="InstituteStore.institutes"
            optionLabel="name"
            optionValue="id"
            placeholder="Select an Institute"
            class="w-12"
          />
        </div>
      </div>

      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          @click="closeModal"
          class="p-button-text"
        />
        <Button label="Add" icon="pi pi-check" @click="addToMcqSet" autofocus />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { useMcqSetStore } from "~~/src/stores/mcqset.store";
import { useInstituteStore } from "~~/src/stores/institute.store";
import { useToast } from "primevue/usetoast";
import PreviousQuestionService from "~~/src/services/PreviousQuestions.Service";

const props = defineProps(["addToMcq", "questionId"]);
const emits = defineEmits(["closeAddToMcqSetModal"]);

// hooks
const McqSetStore = useMcqSetStore();
const InstituteStore = useInstituteStore();
const toast = useToast();
const PreviousQuestion = new PreviousQuestionService();

// states
const selectedMcqSet = ref(null);
const selectedInstitute = ref(null);

// methods
const closeModal = () => {
  selectedMcqSet.value = null;
  selectedInstitute.value = null;
  emits("closeAddToMcqSetModal");
};

const addToMcqSet = async () => {
  if (selectedMcqSet.value === null) {
    toast.add({
      severity: "warn",
      summary: "Request denied",
      detail: "You must select a MCQ Set first",
      life: 3000,
    });
  } else {
    const formData = {
      mcq_set_id: selectedMcqSet.value,
      institute_id: selectedInstitute.value,
      questions: [props.questionId],
    };

    const response = await PreviousQuestion.AssignQuestionToMcqSet(formData);

    if (response.success) {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: response.message,
        life: 3000,
      });
    } else {
      toast.add({
        severity: "error",
        summary: "Failed",
        detail: response.message,
        life: 3000,
      });
    }

    closeModal();
  }
};
</script>

<style lang="scss" scoped></style>
