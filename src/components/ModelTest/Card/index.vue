<template>
  <div
    :class="
      'data-card background-' +
      (props.index % 2) +
      ' border-radious-' +
      cardPosition(props.isFirst, props.isLast)
    "
  >
    <div class="card-header grid justify-contents-between align-items-center">
      <div class="card-sub-header col-11 md:col-6">
        <CommonCardBreadcrumb :start="true" :bread-crumb-item="breadItem" />
      </div>

      <ActionButtons
        @view-data="viewDetails(modelTest?.id)"
        @delete-data="deleteModelTest(modelTest?.id)"
        @edit-data="editModeltest(modelTest?.id)"
      />
    </div>

    <div class="card-body grid">
      <div class="col-12 md:col-8">
        <p class="text-question">Model Question Name</p>
        <div class="title">{{ modelTest.name }}</div>

        <div class="grid mt-12">
          <ModelTestCardMetaData
            class="col-6 md:col-2"
            :data-key="'Exam Duration'"
            :value="modelTest?.exam_duration"
          />
          <ModelTestCardMetaData
            class="col-6 md:col-2"
            :data-key="'Total Question'"
            :value="modelTest?.questions.length"
          />
          <ModelTestCardMetaData
            class="col-6 md:col-2"
            :data-key="'Max Question'"
            :value="modelTest?.max_question"
          />
          <ModelTestCardMetaData
            class="col-6 md:col-3"
            :data-key="'Generate Type'"
            :value="modelTest?.question_generate_type"
          />
          <ModelTestCardMetaData
            class="col-6 md:col-3"
            :data-key="'Subscription'"
            :value="modelTest?.type"
          />
        </div>

        <div class="mt-30">
          <ModelTestCardSchedule
            :schedule="modelTest.schedules[0]"
            :background-white="props.index % 2 === 0"
          />
        </div>

        <div class="mt-16">
          <ModelTestCardResult :value="modelTest?.result_published_at" />
        </div>
      </div>

      <div class="col-12 md:col-4">
        <p class="sub-title">Subjects</p>
        <div>
          <ModelTestCardSubjects
            :values="modelTest?.subjects"
            :background-white="props.index % 2 === 0"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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

// const props = defineProps(["Question", "questionIndex", "isFirst", "isLast"]);
const props = defineProps<{
  modelTest: object;
  index: number;
  isFirst: boolean;
  isLast: boolean;
}>();

const questionHeader = ref();
const viewWithImage = ref(false);
const addToMcq = ref(false);
const questionIdToSetMcq = ref(null);

const breadItem = {
  label: props.modelTest.curriculum.name,
  item: { label: props.modelTest.sessions[0].name },
};

// Methods
const cardPosition = (isFirst, isLast) => {
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

const editQuestion = (questionId) => {
  router.push({ path: "/question/edit", query: { id: questionId } });
};

const viewDetails = async (id: number) => {
  router.push("/model-tests/" + id);
};

const deleteModelTest = (id: number) => {
  console.log(id);
};

const editModeltest = (id: number) => {
  console.log(id);
};
</script>

<style scoped>
.data-card {
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

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-sub-header {
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

.title {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  display: flex;
  align-items: center;

  color: #3e3e3e;
}

.header-arrow {
  padding-right: 0.875rem;
  padding-left: 0.875rem;
}

.ellipsis-button {
  color: #a4a4a4;
}

.card-body {
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

.mt-30 {
  margin-top: 30px;
}
.mt-16 {
  margin-top: 16px;
}
.mt-12 {
  margin-top: 12px;
}

.sub-title {
  width: 88px;
  height: 30px;

  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  /* identical to box height */

  display: flex;
  align-items: center;

  color: #5e5e5e;
}
</style>
