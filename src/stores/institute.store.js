import { defineStore } from "pinia";
// import { Store } from "~/services/storages";
import FetchService from "~~/src/services/Fetch.Service";

export const useInstituteStore = defineStore("institute", {
  state: () => {
    return {
      institutes: [],
    };
  },

  getters: {
    getMcqSetById: (state) => {
      return (instituteId) => {
        return state.institutes.filter(
          (institute) => institute.id === Number(instituteId)
        )[0];
      };
    },
  },

  actions: {
    setInstitutes(institutes) {
      this.institutes = [...institutes.data];
    },

    addInstitutes(payload) {
      this.institutes.unshift(payload);
    },

    getItemById(id) {
      return this.institutes.filter((institute) => institute.id === id)[0];
    },

    deleteRecord(id) {
      this.institutes = this.institutes.filter((item) => item.id !== id);
      return this.institutes;
    },
  },
});
