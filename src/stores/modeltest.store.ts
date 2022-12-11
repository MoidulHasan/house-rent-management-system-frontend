import { defineStore } from "pinia";

export const useModelTestStore = defineStore("modelTestStore", {
  state: () => {
    return {
      modelTests: [],
      paginator: {
        page: null,
        lastPage: null,
        perPage: null,
        total: null,
      },
    };
  },

  getters: {
    getItemById: (state) => {
      return (id) => {
        return state.modelTests.filter(
          (modelTest) => modelTest.id === Number(id)
        )[0];
      };
    },

    filterByName: (state) => {
      return (query) => {
        return state.modelTests.filter((modelTest) =>
          modelTest.name.includes(query)
        );
      };
    },
  },

  actions: {
    setModelTests(modelTests) {
      this.modelTests = [...this.modelTests, ...modelTests.data];
      this.paginator = {
        page: modelTests.page,
        lastPage: modelTests.lastPage,
        perPage: modelTests.perPage,
        total: modelTests.total,
      };
    },

    deleteRecordById(id) {
      this.modelTests = this.modelTests.filter((item) => item.id !== id);
      return this.modelTests;
    },

    addNewRecord(item) {
      this.modelTests.push(item);
    },
  },
});
