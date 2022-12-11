<template>
  <div class="grid question-options">
    <div
      v-for="(n, index) in 3"
      :key="index"
      class="col-6 flex flex-row align-items-center"
    >
      <span>
        <img
          :src="'/images/icons/options/option-bn-' + index + '.svg'"
          alt=""
        />
      </span>
      <span class="option-text">
        <QuestionCardOptionsAnswer :option="props.options[index]?.answer" />
        <!-- {{ props.options[index]?.answer }} -->
      </span>
    </div>

    <div class="col-6 flex flex-row align-items-center">
      <span>
        <img
          class="currect-answer-icon"
          src="/images/icons/options/option-bn-3.svg"
          alt=""
        />
      </span>
      <span class="option-text currect-answer-text">
        <QuestionCardOptionsAnswer :option="props.currectAnswer" />
        <!-- {{ props.currectAnswer }} -->
      </span>
    </div>

    <div
      v-show="!collapsed"
      v-for="(n, index) in props?.options.length - 3"
      :key="index"
      class="col-6"
    >
      <div class="flex flex-row align-items-center">
        <span>
          <img
            :src="
              '/images/icons/options/option-bn-' + Number(index + 4) + '.svg'
            "
            alt=""
          />
        </span>

        <span class="option-text">
          <QuestionCardOptionsAnswer
            :option="props.options[index + 3]?.answer"
          />
          <!-- {{ props.options[index + 3]?.answer }} -->
        </span>
      </div>
    </div>

    <div class="col-12">
      <CommonLoadMore
        v-if="props?.options.length > 3"
        :collapsed="collapsed"
        @on-click="collapsedButtonClicked"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["options", "currectAnswer"]);

const collapsed = ref(true);

const collapsedButtonClicked = () => {
  collapsed.value = !collapsed.value;
};
</script>

<style lang="scss" scoped>
.question-options {
  margin-top: 19px;
}

.option-text {
  margin-left: 8px;

  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;

  color: #616161;
}

.currect-answer-icon {
  color: #ffffff;
}

.currect-answer-text {
  color: #3bb54a;
  font-weight: bold;
}
</style>
