import { defineStore } from "pinia";
// import { Store } from "~/services/storages";
import FetchService from "~~/src/services/Fetch.Service";

export const useMcqSetStore = defineStore("mcqSetStore", {
  state: () => {
    return {
      mcqSets: [],
    };
  },

  getters: {
    getMcqSetId: (state) => {
      return (mcqSetId) => {
        return state.mcqSets.filter(
          (mcqSet) => mcqSet.id === Number(mcqSetId)
        )[0];
      };
    },
  },

  actions: {
    setMcqSets(mcqSets) {
      this.mcqSets = [...mcqSets.data];
    },

    addMcqSet(payload) {
      this.mcqSets.unshift(payload);
    },

    getItemById(id) {
      return this.mcqSets.filter((mcqSet) => mcqSet.id === id)[0];
    },

    deleteRecord(id) {
      this.mcqSets = this.mcqSets.filter((item) => item.id !== id);
      return this.mcqSets;
    },
  },
});
