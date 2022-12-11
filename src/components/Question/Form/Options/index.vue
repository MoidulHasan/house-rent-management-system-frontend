<template>
  <div class="grid">
    <div class="col-12 mt-32">
      <p class="input-label flex">
        <span class="text-red-400 font-bold">*</span>Please Provide Options
        <span style="color: #ff0f0f"> (Remember! All options are requied)</span>
      </p>

      <div v-if="optionRender" class="grid">
        <QuestionFormOptionsSingle
          class="col-6"
          v-for="(option, index) in allOptions"
          :key="index"
          :option-value="option"
          :index="index"
          :options-length="allOptions.length"
          @value-change="optionValueChange"
          @currect-answer-changed="currectAnswerChanged"
          @on-delete="deleteOption"
        />
      </div>

      <Button
        @click="addMoreOption"
        class="w-full mt-16 add-more-button flex align-items-center justify-content-center"
      >
        <span
          class="button-text flex align-items-center justify-content-center"
        >
          Add More Option
        </span>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "primevue/usetoast";

// interfaces
interface option {
  checked: boolean;
  type: string;
  value: object | string;
}

// define hooks
const toast = useToast();

// Define props
const props = defineProps<{
  options: option[];
  submitForm: boolean;
}>();

const emits = defineEmits<{
  (e: "valueChange", value: option[]): void;
}>();

// define states
const allOptions = ref([
  {
    checked: false,
    type: "text",
    value: null,
  },
  {
    checked: false,
    type: "text",
    value: null,
  },
  {
    checked: false,
    type: "text",
    value: null,
  },
  {
    checked: false,
    type: "text",
    value: null,
  },
]);

const currectAnswerIndex = ref(null);

const optionRender = ref(true);

// methods
const optionValueChange = async (index: number, optionValue: option) => {
  const duplicate = allOptions.value.filter((option, idx) => {
    if (
      option.type != "image" &&
      option.value != null &&
      option.value === optionValue.value &&
      index != idx
    ) {
      return true;
    }
  });

  if (duplicate.length > 0) {
    toast.add({
      severity: "error",
      summary: "Duplicate Option Value",
      detail: "Option value cannot be duplicate",
      life: 3000,
    });
  }

  // optionRender.value = false;
  allOptions.value[index] = optionValue;

  // await nextTick();
  // optionRender.value = true;
};

const currectAnswerChanged = async (index: number) => {
  optionRender.value = false;
  for (let i = 0; i < allOptions.value.length; i++) {
    allOptions.value[i].checked = false;
  }

  allOptions.value[index].checked = true;

  currectAnswerIndex.value = index;

  await nextTick();
  optionRender.value = true;
};

const addMoreOption = () => {
  const option = {
    checked: false,
    type: "text",
    value: null,
  };
  allOptions.value.push(option);
};

const deleteOption = (index: number) => {
  allOptions.value.splice(index, 1);
};

onMounted(async () => {
  if (props?.options) {
    optionRender.value = false;
    allOptions.value = [...props?.options];
    await nextTick();
    optionRender.value = true;
  }
});

onUpdated(() => {
  if (props.submitForm) {
    emits("valueChange", allOptions.value);
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

.mt-32 {
  margin-top: 32px;
}

.mt-16 {
  margin-top: 16px;
}

.add-more-button {
  box-sizing: border-box;

  width: 1458px;
  //   height: 56px;

  background: #fbfbfb;
  border: 1px #ebe9e9;
  border-radius: 4px;
}

.button-text {
  width: 100%;
  height: 27px;

  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  /* identical to box height */

  color: #000000;
}

.add-more-button:hover {
  background: #f0f0f8;
}
</style>
