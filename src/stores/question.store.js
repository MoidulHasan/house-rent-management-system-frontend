import { defineStore } from "pinia";

export const useQuestionStore = defineStore("questionStore", {
  state: () => {
    return {
      questions: [],
      questionOptions: [],
      paginator: {},
    };
  },

  getters: {
    getQuestionById: (state) => {
      return (questionId) => {
        return state.questions.filter(
          (question) => question.id === Number(questionId)
        )[0];
      };
    },

    filterByTitle: (state) => {
      return (query) => {
        return state.questions.filter((question) =>
          question.title.includes(query)
        );
      };
    },

    getQuestionsWithPagination(state) {
      return { data: state.questions };
    },
  },

  actions: {
    setQuestions(questions) {
      this.questions = [...this.questions, ...questions.data];
      this.paginator = {
        page: questions.page,
        lastPage: questions.lastPage,
        perPage: questions.perPage,
        total: questions.total,
      };
    },

    addQuestion(payload) {
      this.questions.unshift(payload);
    },

    getItemById(id) {
      return this.questions.filter((question) => question.id === id)[0];
    },

    // fetchQuestions() {
    //   return new Store().getData("questions");
    // },

    setOptions(options = []) {
      this.questionOptions = options;
    },

    updateOptions(option) {
      this.questionOptions = this.questionOptions.map((item) => {
        if (item.id === option.id) item.option = option.option;
        return item;
      });
    },

    deleteRecord(id) {
      this.questions = this.questions.filter((item) => item.id !== id);
      return this.questions;
    },

    addNewQuestion(option) {
      this.questionOptions.push(option);
    },

    removeOptions(index) {
      this.questionOptions = this.questionOptions.filter(
        (item, key) => key !== index
      );
    },
  },
});
