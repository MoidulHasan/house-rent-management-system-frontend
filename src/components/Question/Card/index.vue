<template>
  <div
    :class="
      'question-card background-' +
      (props.questionIndex % 2) +
      ' border-radious-' +
      questionPosition(props.isFirst, props.isLast)
    "
  >
    <div
      class="question-header grid justify-contents-between align-items-center"
    >
      <div class="question-sub-header col-11 md:col-6">
        <CommonCardBreadcrumb :start="true" :bread-crumb-item="breadItem" />
      </div>

      <QuestionCardActionButtons
        @delete-question="QuestionDelete(Question?.id)"
        @add-to-mcq="addToMcqSet(Question?.id)"
        @edit-question="editQuestion(Question?.id)"
      />
    </div>

    <div class="question-body">
      <p class="text-question">Question</p>
      <QuestionCardTitle :title="Question.title.split('![](')[0]" />

      <Button
        :onclick="() => (viewWithImage = !viewWithImage)"
        class="view-title-image p-button-text"
        v-if="Question.title.split('![](')[1]"
      >
        <img
          class="view-image"
          :src="'/images/icons/view-title-image.svg'"
          alt=""
        />

        <QuestionCardTitleImage
          :visible="viewWithImage"
          :title="Question.title.split('![](')[0]"
          :image-src="Question.title.split('![](')[1].slice(0, -1)"
          @on-close="() => (viewWithImage = !viewWithImage)"
        />
        <span class="view-image-text">View images</span>
      </Button>

      <QuestionCardOptions
        :options="Question?.options"
        :currect-answer="Question?.correct_answer"
      />

      <QuestionCardAddToMcqSet
        :add-to-mcq="addToMcq"
        :question-id="questionIdToSetMcq"
        @close-add-to-mcq-set-modal="closeAddToMcqSet"
      />
    </div>
  </div>
</template>

<script setup>
import QuestionService from "~~/src/services/Question.service";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useQuestionStore } from "~~/src/stores/question.store";
import McqSetService from "~~/src/services/McqSet.service";
import { useMcqSetStore } from "~~/src/stores/mcqset.store";
import InstituteService from "~~/src/services/Institute.Service";
import { useInstituteStore } from "~~/src/stores/institute.store";

const router = useRouter();
const confirm = useConfirm();
const toast = useToast();
const QuestionStore = useQuestionStore();
const McqSet = new McqSetService();
const McqSetStore = useMcqSetStore();
const Institute = new InstituteService();
const instituteStore = useInstituteStore();

const props = defineProps(["Question", "questionIndex", "isFirst", "isLast"]);

const questionHeader = ref();
const viewWithImage = ref(false);
const addToMcq = ref(false);
const questionIdToSetMcq = ref(null);

const breadItem = {
  label: props?.Question?.subject?.curriculum?.name,
  item: { label: props?.Question?.subject?.name },
};

// Methods
const questionPosition = (isFirst, isLast) => {
  if (isFirst) {
    return "first";
  } else if (isLast) {
    return "last";
  } else {
    return "middle";
  }
};

const QuestionDelete = (id) => {
  confirm.require({
    message: "Do you want to delete this question?",
    header: "Delete Confirmation",
    icon: "pi pi-info-circle",
    acceptClass: "p-button-danger",
    accept: async () => {
      const Question = new QuestionService();

      const response = await Question.deleteQuestionById(id);

      if (response.success) {
        toast.add({
          severity: "info",
          summary: "Success",
          detail: response.message,
          life: 3000,
        });

        QuestionStore.deleteRecord(id);
      } else {
        toast.add({
          severity: "error",
          summary: "Failed",
          detail: response.message,
          life: 3000,
        });
      }
    },
    reject: () => {
      toast.add({
        severity: "error",
        summary: "Rejected",
        detail: "You have rejected",
        life: 3000,
      });
    },
    onHide: () => {
      toast.add({
        severity: "error",
        summary: "Hide",
        detail: "You have hidden",
        life: 3000,
      });
    },
  });
};

const addToMcqSet = async (id) => {
  addToMcq.value = true;
  questionIdToSetMcq.value = id;

  const mcqSet = await McqSet.getAll();

  McqSetStore.setMcqSets(mcqSet.data);

  const institutes = await Institute.getAll();

  instituteStore.setInstitutes(institutes);
};

const editQuestion = (questionId) => {
  router.push({ path: "/question/edit", query: { id: questionId } });
};

const closeAddToMcqSet = () => {
  addToMcq.value = false;
  questionIdToSetMcq.value = null;
};

onMounted(() => {
  console.log(toRaw(props.Question));
});
</script>

<style scoped>
.question-card {
  min-height: 273px;
  padding: 32px;
}

.background-1 {
  background: #fafafe;
}

.background-0 {
  background: #ffffff;
}

.border-radious-first {
  border-radius: 12px 12px 0px 0px;
}

.border-radious-middle {
  border-radius: 0px;
}

.border-radious-last {
  border-radius: 0px 0px 12px 12px;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.question-sub-header {
  display: flex;
  align-items: center;
  align-content: flex-end;
  padding: 0px;
}

.header-text {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 1rem;
  display: flex;
  align-items: center;
  color: #5e5e5e;
}

.header-arrow {
  padding-right: 0.875rem;
  padding-left: 0.875rem;
}

.ellipsis-button {
  color: #a4a4a4;
}

.question-body {
  padding: 0px;
  margin: 0px;
}

.text-question {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;

  display: flex;
  align-items: center;

  color: #b1b1b1;

  margin: 0;
}

.view-title-image {
  display: flex;
  align-items: center;
  border: none;
  padding: 0;
}

.view-image {
  width: 24px;
  /* height: 24px; */
  height: 1.5rem;
  margin-right: 5px;
}

.view-image-text {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  /* font-size: 12px; */
  font-size: 0.75rem;
  line-height: 18px;

  display: flex;
  align-items: center;
  text-decoration-line: underline;

  color: #4296ac;
}
</style>
