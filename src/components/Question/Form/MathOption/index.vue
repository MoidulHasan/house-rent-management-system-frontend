<template>
  <div>
    <math-field
      @input="valueChanged"
      class="mathfield p-input"
      :id="'mathfield-' + props.index"
      virtualKeyboardMode="onfocus"
      virtualKeyboardLayout="dvorak"
      virtualKeyboardContainer="keyboardContainer"
      :config="{ smartFence: false }"
    >
      {{ props.value }}
    </math-field>
  </div>
</template>

<script setup>
// props
const props = defineProps(["index", "value"]);

// events
const emits = defineEmits(["valueChange"]);

const valueChanged = () => {
  const mathvalue = document
    .getElementById("mathfield-" + props.index)
    .getValue();
  emits("valueChange", mathvalue);
};

onMounted(() => {
  document.getElementById("mathfield-" + props.index).innerHtml = props.value;
});
</script>

<style lang="scss" scoped>
.mathfield {
  border: 0.1px solid #ddd;
  //   padding: 5px;
  //   margin: 10px 0 10px 0;
  border-radius: 5px;
  background-color: #f8f8f8;
}
.output {
  //   padding: 5px;
  //   margin: 20px 0 20px 0;
  border-radius: 5px;
  //   border: 0.1px solid #000;

  font-family: "Source Code Pro", Menlo, "Bitstream Vera Sans Mono", Monaco,
    Courier, "Andale Mono", monospace;
  color: #f0c674;
  background: #35434e;
}
</style>
