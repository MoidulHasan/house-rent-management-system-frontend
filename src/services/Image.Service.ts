import FetchService from "./Fetch.Service";
import { useAuthStore } from "~~/src/stores/auth.store";
import { TOKEN_NAME } from "constants/token";

const Fetch = new FetchService();

export default class ImageService {
  config = useRuntimeConfig();
  baseUrl = this.config.public.apiBase;

  async Upload(image) {
    const AuthStore = useAuthStore();

    try {
      const formData = new FormData();
      formData.append("image", image, image.name);

      let res = await fetch(this.baseUrl + "/image/upload", {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${AuthStore.token}`,
        },
        body: formData,
      });

      res = await res.json();

      if (res.success) {
        return {
          status: true,
          message: res.message,
          url: res.data.url,
        };
      } else {
        return {
          status: false,
          message: res.message,
        };
      }
    } catch (err) {
      return {
        status: false,
        message: "Error - " + err,
      };
    }
  }
}
