<template>
  <div class="grid">
    <div class="col-6">
      <p class="input-label">
        <span class="text-red-400 font-bold">*</span>Please Select Curriculum
      </p>
      <Dropdown
        :class="
          submitForm && required && !selectedCurriculum
            ? 'w-full dropdown border-red-500'
            : 'w-full dropdown'
        "
        v-model="selectedCurriculum"
        :options="CurriculumStore.curriculums"
        optionLabel="name"
        optionValue="id"
        placeholder="Please Select Curriculum"
      />
      <p
        v-if="submitForm && required && !selectedCurriculum"
        class="text-red-500"
      >
        Curriculum is required
      </p>
    </div>
    <div class="col-6">
      <p class="input-label">
        <span class="text-red-400 font-bold">*</span>Please Select Subject
      </p>
      <Dropdown
        :disabled="selectedCurriculum === null"
        :class="
          submitForm && required && !selectedSubject
            ? 'w-full dropdown border-red-500'
            : 'w-full dropdown'
        "
        v-model="selectedSubject"
        :options="SubjectStore.getSubjectByCurriculumId(selectedCurriculum)"
        optionLabel="name"
        optionValue="id"
        placeholder="Please Select Subject"
      />
      <p v-if="submitForm && required && !selectedSubject" class="text-red-500">
        Subject is required
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SubjectService from "~~/src/services/Subject.Service";
import { useSubjectStore } from "~~/src/stores/subject.store";
import CurriculumService from "~~/src/services/Curriculum.Service";
import { useCurriculumStore } from "~~/src/stores/curriculum.store";

// Hooks
const Subject = new SubjectService();
const SubjectStore = useSubjectStore();
const Curriculum = new CurriculumService();
const CurriculumStore = useCurriculumStore();

// Props
const props = defineProps({
  selectedCurriculum: { type: Number },
  selectedSubject: { type: Number },
  submitForm: { type: Boolean },
  required: { type: Boolean },
});

// events
const emits = defineEmits(["subjectChange", "curriculumChange"]);

// States
const selectedCurriculum = ref(null);
const selectedSubject = ref(null);

// Methods
onMounted(async () => {
  if (props.selectedCurriculum)
    selectedCurriculum.value = props.selectedCurriculum;

  if (props.selectedSubject) selectedSubject.value = props.selectedSubject;

  const subjects = await Subject.getAll();

  SubjectStore.setSubjects(subjects.data);

  const curriculums = await Curriculum.getAll();

  CurriculumStore.setCurriculum(curriculums.data);
});

onUpdated(() => {
  if (props.submitForm) {
    emits("subjectChange", selectedSubject.value);
    emits("curriculumChange", selectedSubject.value);
  }
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
</style>
