import { useState } from "#app";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      user: {},
      token: "",
    };
  },

  getters: {
    authenticated: (state) => {
      // const token = useState("token");
      // const user = useState("user");

      // if (user) state.user = user;
      // if (token) state.token = token;

      // if (token || Object.keys(state.user).length > 0) return true;
      return Object.keys(state.user).length > 0;
    },
  },

  actions: {
    setUser(user) {
      // useState("user").value = user;
      this.user = user;
    },
    setToken(token) {
      this.token = token;
      // useState("token").value = token;
    },
  },
});
