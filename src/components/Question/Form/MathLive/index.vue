<template>
  <div>
    <Dialog
      header="Insert Formula"
      :position="'top'"
      :draggable="false"
      :visible="display"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '50vw' }"
      :closable="false"
    >
      <math-field
        class="mathfield"
        id="mf"
        virtualKeyboardMode="onfocus"
        virtualKeyboardLayout="dvorak"
        virtualKeyboardContainer="keyboardContainer"
        :config="{ smartFence: false }"
      />

      <p id="keyboardContainer"></p>

      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          @click="closeModal"
          class="p-button-text p-1"
        />
        <Button
          label="Ok"
          icon="pi pi-check"
          class="p-1"
          @click="insertMath"
          autofocus
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
const props = defineProps(["display"]);

const emits = defineEmits(["close"]);

// states
const formula = ref("g(x)");
const input = ref(null);

const keyboardContainer = ref(null);

// methods
onMounted(() => {
  keyboardContainer.value = document.getElementById("keyboardContainer");
});

const closeModal = () => {
  emits("close");
};

const insertMath = () => {
  const mathvalue = document.getElementById("mf").getValue();
  emits("insert", mathvalue);
};
</script>

<style lang="scss" scoped>
.mathfield {
  border: 1px solid #ddd;
  padding: 5px;
  margin: 10px 0 10px 0;
  border-radius: 5px;
  background-color: #fff;
}
.output {
  padding: 5px;
  margin: 20px 0 20px 0;
  border-radius: 5px;
  border: 1px solid #000;

  font-family: "Source Code Pro", Menlo, "Bitstream Vera Sans Mono", Monaco,
    Courier, "Andale Mono", monospace;
  color: #f0c674;
  background: #35434e;
}
</style>
