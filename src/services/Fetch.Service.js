import { useAuthStore } from "../stores/auth.store";

export default class FetchService {
  async postData(url = "", data = {}) {

    const AuthStore = useAuthStore();

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${AuthStore.token}`,
      },
      body: JSON.stringify(data),
    });

    const finalResponse = await response.json();

    return finalResponse;
  }

  async getData(url) {
    const AuthStore = useAuthStore();

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${AuthStore.token}`,
      },
    });

    const finalResponse = await response.json();

    return finalResponse;
  }

  async deleteData(url) {
    const AuthStore = useAuthStore();

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${AuthStore.token}`,
      },
      mode: "cors",
    });

    const finalResponse = await response.json();

    return finalResponse;
  }

  async putData(url = "", data = {}) {
    const AuthStore = useAuthStore();

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${AuthStore.token}`,
      },
      body: JSON.stringify(data),
    });

    const finalResponse = await response.json();

    return finalResponse;
  }
}
