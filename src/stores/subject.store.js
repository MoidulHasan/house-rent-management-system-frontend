import { defineStore } from "pinia";
// import { Store } from "~/services/storages";
import FetchService from "~~/src/services/Fetch.Service";

export const useSubjectStore = defineStore("subject", {
  state: () => {
    return {
      subjects: [],
    };
  },

  getters: {
    getSubjectById: (state) => {
      return (subjectId) => {
        return state.subjects.filter(
          (subject) => subject.id === Number(subjectId)
        )[0];
      };
    },

    getSubjectByCurriculumId: (state) => {
      return (curriculumId) => {
        return state.subjects.filter(
          (subject) => subject.curriculum_id === Number(curriculumId)
        );
      };
    },
  },

  actions: {
    setSubjects(subjects) {
      this.subjects = [...subjects];
    },

    addSubjects(payload) {
      this.subjects.unshift(payload);
    },

    getItemById(id) {
      return this.subjects.filter((subject) => subject.id === id)[0];
    },

    deleteRecord(id) {
      this.subjects = this.subjects.filter((item) => item.id !== id);
      return this.subjects;
    },
  },
});
