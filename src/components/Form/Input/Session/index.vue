<template>
  <div>
    <h5 class="label">
      <span v-if="required" class="text-red-600">*</span> Please Select Session
    </h5>
    <Dropdown
      v-model="selectedSession"
      :options="sessionStore.findByCurriculumId(curriculum_id)"
      :disabled="!curriculum_id"
      :loading="loadingState"
      @change="sessionChangeHandler"
      optionLabel="name"
      optionValue="id"
      placeholder="Select a Session"
      class="w-full"
    />
  </div>
</template>

<script setup lang="ts">
import { useStore } from "~~/src/stores/store";
import { useSessionStore } from "~~/src/stores/sessions.store";
import SessionsService from "~~/src/services/Sessions.Service";
import { useToast } from "primevue/usetoast";

// define props
const props = defineProps<{
  required?: boolean;
  curriculum_id: number | null;
  value?: number;
  submit?: boolean;
  addValueChangeHandler?: boolean;
}>();

// define emits
const emits = defineEmits<{
  (e: "valueSubmit", curriculum: number);
}>();

// define hooks
const sessionStore = useSessionStore();
const toast = useToast();

// define states
const selectedSession = ref();
const loadingState = ref();

// methods
onMounted(async () => {
  loadingState.value = true;
  const sessions = await SessionsService.fetch();
  if (sessions.success) {
    sessionStore.setSessions(sessions.data);
  } else {
    toast.add({
      severity: "error",
      summary: "Failed",
      detail: sessions.message,
      life: 3000,
    });
  }
  loadingState.value = false;
});

onUpdated(() => {
  if (props.submit) {
    emits("valueSubmit", selectedSession.value);
  }
});

const sessionChangeHandler = () => {
  if (props.addValueChangeHandler === true)
    emits("valueSubmit", selectedSession.value);
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
