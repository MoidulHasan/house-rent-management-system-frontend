import { defineStore } from "pinia";

export const useStore = defineStore("main", {
  state: () => {
    return {
      loading: false,
      pagination: {},
    };
  },
  getters: {},
  actions: {
    setLoading(status) {
      this.loading = status;
    },
    setPagination(pagination) {
      this.pagination = pagination;
    },
  },
});
