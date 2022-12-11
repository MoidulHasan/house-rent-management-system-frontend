import { defineStore } from "pinia";
// import { Store } from "~/services/storages";
import FetchService from "~~/src/services/Fetch.Service";

export const useCurriculumStore = defineStore("curriculum", {
  state: () => {
    return {
      curriculums: [],
    };
  },

  getters: {
    getCurriculumById: (state) => {
      return (curriculumId) => {
        return state.curriculums.filter(
          (curriculum) => curriculum.id === Number(curriculumId)
        )[0];
      };
    },
  },

  actions: {
    setCurriculum(curriculums) {
      this.curriculums = [...curriculums];
    },

    addCurriculum(payload) {
      this.curriculums.unshift(payload);
    },

    getItemById(id) {
      return this.curriculums.filter((curriculum) => curriculum.id === id)[0];
    },

    deleteRecord(id) {
      this.curriculums = this.curriculums.filter((item) => item.id !== id);
      return this.curriculums;
    },
  },
});
