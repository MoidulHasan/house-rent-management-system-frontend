<template>
  <div class="flex align-items-center justify-content-between mt-16">
    <Checkbox
      inputClass="h-full"
      inputId="binary"
      v-model="checked"
      :binary="true"
      @input="currectAnswerChanged"
    />

    <InputText
      v-if="selectedType === 'text'"
      class="w-full mx-3 textInput"
      type="text"
      @input="valueChanged"
      v-model="inputText"
      placeholder=""
    />

    <QuestionFormQuestionImageUpload
      v-if="selectedType === 'image'"
      :title="'Click here to upload Option Image'"
      :value="imputImage"
      :image-type="'option'"
      @image-change="imageChanged"
      class="w-full mx-3 p-0"
    />

    <QuestionFormMathOption
      v-if="selectedType === 'math'"
      class="w-full mx-3 textInput"
      :value="inputMath"
      :index="props.index"
      @input="valueChanged"
      @value-change="formulaChanged"
    />

    <Dropdown
      :class="'dropdown mr-3'"
      v-model="selectedType"
      :options="dropdownOptions"
      optionLabel="name"
      optionValue="value"
    />

    <Button
      v-if="optionsLength > 4"
      icon="pi pi-times"
      class="p-button-rounded p-button-danger p-button-text"
      @click="deleteOption"
    />
  </div>
</template>

<script setup lang="ts">
interface option {
  checked: boolean;
  type: string;
  value: object | string;
}

const props = defineProps<{
  optionValue: option;
  index: number;
  optionsLength: number;
}>();

const emits = defineEmits<{
  (e: "valueChange", index: number, optionValue: option);
  (e: "onDelete", index: number);
  (e: "currectAnswerChanged", index: number);
}>();

const selectedType = ref(props.optionValue.type);
const checked = ref();
const inputText = ref(null);
const imputImage = ref(null);
const inputMath = ref(null);

const imageInputRender = ref(true);

const dropdownOptions = [
  { name: "Text", value: "text" },
  { name: "Image", value: "image" },
  { name: "Math", value: "math" },
];

const valueChanged = () => {
  const inputValue =
    selectedType.value === "text"
      ? inputText.value
      : selectedType.value === "image"
      ? imputImage.value
      : inputMath.value;

  const optionValue = {
    checked: checked.value,
    type: selectedType.value,
    value: inputValue,
  };

  emits("valueChange", props.index, optionValue);
};

const currectAnswerChanged = () => {
  emits("currectAnswerChanged", props.index);
};

const imageChanged = (image) => {
  imputImage.value = image;
  valueChanged();
};

const formulaChanged = (formula) => {
  inputMath.value = "$$ " + formula + " $$";
  valueChanged();
};

const deleteOption = () => {
  emits("onDelete", props.index);
};

onMounted(() => {
  checked.value = props.optionValue.checked;
  selectedType.value = props.optionValue.type;

  if (props.optionValue.type === "text") {
    inputText.value = props.optionValue.value;
  } else if (props.optionValue.type === "image") {
    imputImage.value = props.optionValue.value;
  } else if (props.optionValue.type === "math") {
    inputMath.value = props.optionValue.value;
  }
});

onUpdated(() => {});
</script>

<style lang="scss" scoped>
.mt-16 {
  margin-top: 16px;
}

.dropdown {
  width: 167px;
  //   height: 46px;

  background: #f8f8f8;
  border-radius: 4px;
}

.textInput {
  //   width: 1227px;
  //   height: 46px;

  background: #f8f8f8;
  border-radius: 5px;
}
</style>
