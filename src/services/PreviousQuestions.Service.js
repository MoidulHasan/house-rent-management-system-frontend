import FetchService from "./Fetch.Service";
import { useAuthStore } from "~~/src/stores/auth.store";
import { TOKEN_NAME } from "constants/token";

const Fetch = new FetchService();

export default class PreviousQuestionService {
  config = useRuntimeConfig();
  baseUrl = this.config.public.apiBase;

  async AssignQuestionToMcqSet(formData) {
    try {
      const res = await Fetch.postData(
        this.baseUrl + "/previous-questions/add-to-mcq",
        formData
      );
      return res;
    } catch (err) {
      return {
        success: false,
        message: "Error - " + err,
      };
    }
  }
}
