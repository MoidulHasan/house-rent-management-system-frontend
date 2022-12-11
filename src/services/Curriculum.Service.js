import FetchService from "./Fetch.Service";

export default class SubjectService {
  config = useRuntimeConfig();
  baseUrl = this.config.public.apiBase;

  async getAll() {
    try {
      const curriculums = await new FetchService().getData(
        this.baseUrl + "/curriculum/get-all"
      );

      return curriculums;
    } catch (err) {
      return err;
    }
  }
}
