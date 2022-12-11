<template>
  <div>
    <Button
      @click="() => (addMore = !addMore)"
      :label="`${
        addMore === false ? 'View More Options' : 'Hide More Options'
      }`"
      :icon="`pi ${addMore === false ? 'pi-angle-down' : 'pi-angle-up'}`"
      class="p-button-sm p-button-secondary"
    />
    <Transition name="fade">
      <div class="grid mt-2" v-show="addMore">
        <div class="col-6">
          <p class="input-label">Please Select MCQ Set</p>
          <Dropdown
            class="w-full dropdown"
            v-model="selectedMCQSet"
            :options="McqSetStore.mcqSets"
            optionLabel="name"
            optionValue="id"
            placeholder="Please Select MCQ Set"
            @change="mcqSetChanged"
          />
        </div>
        <div class="col-6">
          <p class="input-label">Please Select Institute</p>
          <Dropdown
            class="w-full dropdown"
            v-model="selectedInstitute"
            :options="InstituteStore.institutes"
            optionLabel="name"
            optionValue="id"
            placeholder="Please Select Institute"
            @change="instituteChanged"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import McqSetService from "~~/src/services/McqSet.service";
import { useMcqSetStore } from "~~/src/stores/mcqset.store";
import InstituteService from "~~/src/services/Institute.Service";
import { useInstituteStore } from "~~/src/stores/institute.store";

// props
const props = defineProps(["mcqSetId", "instituteId"]);

// events
const emits = defineEmits(["mcqSetChange", "instituteChange"]);

// Hooks
const McqSet = new McqSetService();
const McqSetStore = useMcqSetStore();
const Institute = new InstituteService();
const InstituteStore = useInstituteStore();

// States
const addMore = ref(false);
const selectedInstitute = ref();
const selectedMCQSet = ref();

// methods
onMounted(async () => {
  const mcqSet = await McqSet.getAll();

  McqSetStore.setMcqSets(mcqSet.data);

  const institutes = await Institute.getAll();

  InstituteStore.setInstitutes(institutes);
});

// mcq set change handler
const mcqSetChanged = () => {
  emits("mcqSetChange", selectedMCQSet.value);
};

// institute change handler
const instituteChanged = () => {
  emits("instituteChange", selectedInstitute.value);
};
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
