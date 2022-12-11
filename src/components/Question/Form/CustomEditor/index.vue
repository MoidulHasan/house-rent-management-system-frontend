<template>
  <div class="mt-16">
    <p class="input-label">
      <span v-if="props.required" class="text-red-400 font-bold">*</span>
      <span>{{ props.title }}</span>
    </p>

    <div
      :class="`
        border-1 p-0  border-round-sm 
        ${
          submitForm && required && !haveValue
            ? ' border-red-500 '
            : ' border-gray-400 '
        }`"
    >
      <div class="flex flex-wrap gap-1 pb-1 px-2 bg-bluegray-50 relative">
        <Button
          @click="applyStyle('bold')"
          :class="'border-none outline-none p-button-outlined p-button-secondary  p-2'"
        >
          𝐁
        </Button>

        <Button
          @click="applyStyle('italic')"
          :class="'border-none outline-none p-button-outlined p-button-secondary  p-2 '"
        >
          𝙄
        </Button>

        <Button
          @click="applyStyle('underline')"
          :class="'border-none outline-none p-button-outlined p-button-secondary font-bold p-2'"
        >
          U̲
        </Button>

        <Button
          v-if="!minimalToolbar"
          @click="applyStyle('heading')"
          label="H"
          :class="'border-none outline-none p-button-outlined p-button-secondary  p-2'"
        />

        <Button
          v-if="!minimalToolbar"
          @click="applyStyle('insertUnorderedList')"
          icon="pi pi-list"
          :class="'border-none outline-none p-button-outlined p-button-secondary  p-2'"
        />

        <Button
          v-if="!minimalToolbar"
          @click="applyStyle('insertOrderedList')"
          class="border-none outline-none p-button-outlined p-button-secondary p-2"
        >
          <img
            height="15"
            :src="'/images/icons/order-list.svg'"
            alt=""
            srcset=""
          />
        </Button>

        <div
          class="dropdown border-none outline-none p-button-outlined p-button-secondary"
        >
          <Button
            v-if="!minimalToolbar"
            icon="pi pi-align-left"
            :class="'border-none outline-none p-button-outlined p-button-secondary'"
          />

          <div class="dropdown-content">
            <Button
              v-if="!minimalToolbar"
              @click="applyStyle('justifyLeft')"
              icon="pi pi-align-left"
              :class="'border-none outline-none p-button-outlined p-button-secondary'"
            />
            <Button
              v-if="!minimalToolbar"
              @click="applyStyle('justifyRight')"
              icon="pi pi-align-right"
              :class="'border-none outline-none p-button-outlined p-button-secondary'"
            />
            <Button
              v-if="!minimalToolbar"
              @click="applyStyle('justifyFull')"
              icon="pi pi-align-justify"
              :class="'border-none outline-none p-button-outlined p-button-secondary'"
            />
            <Button
              v-if="!minimalToolbar"
              @click="applyStyle('justifyCenter')"
              icon="pi pi-align-center"
              :class="'border-none outline-none p-button-outlined p-button-secondary'"
            />
          </div>
        </div>

        <Button
          @click="applyMath"
          :class="'border-none outline-none p-button-outlined p-button-secondary font-bold p-2'"
        >
          <span data-atom-id="khdmd" class="ML__base">
            <span
              data-atom-id="pf1j8p"
              class="ML__mathit"
              style="margin-right: 0.11em"
              >f</span
            >
            <span data-atom-id="lk1062" class="left-right">
              <span data-atom-id="lk1062" class="ML__small-delim ML__open">
                <span>(</span>
              </span>
              <span>
                <span data-atom-id="lk229r"></span>
                <span data-atom-id="lk80e" class="ML__mathit">x</span>
              </span>
              <span data-atom-id="lk1062" class="ML__small-delim ML__close">
                <span>)</span>
              </span>
            </span>
          </span>
        </Button>
      </div>

      <div
        v-html="innerValue"
        contenteditable="true"
        :class="`wysiwyg-output-${name} outline-none border-1 p-4 rounded-lg border-gray-200`"
        @input="onInput"
        ref="inputValue"
      />
    </div>
    <p v-if="submitForm && required && !haveValue" class="text-red-500">
      {{ title }} is required
    </p>

    <div class="my-5">
      <QuestionFormMathLive
        :display="displayFormulaModal"
        @close="closeModal"
        @insert="insertMath"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Marked } from "@ts-stack/markdown";
import TurndownService from "turndown";

// define props
const props = defineProps({
  value: { type: String },
  minimalToolbar: { type: Boolean, required: true },
  name: { type: String, required: true },
  required: { type: Boolean, required: true },
  submitForm: { type: Boolean, required: true },
  title: { type: String, required: true },
});

// Define events
const emits = defineEmits(["valueChange"]);

// Define Hooks
const turndownService = new TurndownService();

turndownService.addRule("strikethrough", {
  filter: ["u"],
  replacement: function (content) {
    return "<u>" + content + "</u>";
  },
});

// States
const inputValue = ref("");
const displayFormulaModal = ref(false);
const innerValue = ref("");
const haveValue = ref(false);

// methods
onMounted(() => {
  document.execCommand("defaultParagraphSeparator", false, "p");
  innerValue.value = props.value ? Marked.parse(props.value) : "";

  // if (props.submitForm === true) {
  //   valueChanged();
  // }
});

onUpdated(() => {
  if (props.submitForm === true) {
    valueChanged();
  }
});

const applyMath = () => {
  displayFormulaModal.value = true;
};

const closeModal = () => {
  displayFormulaModal.value = false;
};

const insertMath = (value) => {
  displayFormulaModal.value = false;

  const editarea = document.querySelector(".wysiwyg-output-" + props.name);

  const span = document.createElement("span");

  span.innerHTML = " $$ " + value + " $$ ";

  editarea.appendChild(span);
};

const applyStyle = (command) => {
  document.querySelector(".wysiwyg-output-" + props.name).focus();

  if (command === "heading") document.execCommand("formatBlock", false, "<h1>");
  else document.execCommand(command);
};

const onInput = () => {
  if (inputValue.value?.innerHTML?.length) haveValue.value = true;
  else haveValue.value = false;
};

const valueChanged = () => {
  const value = inputValue.value.innerHTML;

  const markdown = turndownService.turndown(value);
  emits("valueChange", markdown);
};
</script>

<style lang="scss" scoped>
.wysiwyg-output h1 {
  @apply text-2xl;
  @apply font-bold;
  @apply pb-4;
}
.wysiwyg-output p {
  @apply pb-4;
}
.wysiwyg-output p {
  @apply pb-4;
}
.wysiwyg-output ul {
  @apply ml-6;
  @apply list-disc;
}
.wysiwyg-output ol {
  @apply ml-6;
  @apply list-decimal;
}

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

.mt-16 {
  margin-top: 16px;
}

.math-icon {
  filter: invert(20%) sepia(10%) hue-rotate(86deg) brightness(250%);
}

.align-button-container {
  position: relative;
}

.dropdown {
  position: relative;
  display: inline-block;
  padding-top: 1px;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  // min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #3e8e41;
}
</style>
