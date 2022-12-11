import { defineStore } from "pinia";

export const useSessionStore = defineStore("sessionStore", {
  state: () => {
    return {
      sessions: [],
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
        return state.sessions.filter((session) => session.id === Number(id))[0];
      };
    },

    filterByName: (state) => {
      return (query) => {
        return state.sessions.filter((session) => session.name.includes(query));
      };
    },

    findByCurriculumId: (state) => {
      return (curriculum_id: number) => {
        return state.sessions.filter((session) => {
          return session.curriculum_id === curriculum_id;
        });
      };
    },
  },

  actions: {
    setSessions(sessions) {
      this.sessions = [...this.sessions, ...sessions.data];
      this.paginator = {
        page: sessions.page,
        lastPage: sessions.lastPage,
        perPage: sessions.perPage,
        total: sessions.total,
      };
    },

    deleteRecordById(id) {
      this.sessions = this.sessions.filter((item) => item.id !== id);
      return this.sessions;
    },

    addNewRecord(item) {
      this.sessions.push(item);
    },
  },
});
