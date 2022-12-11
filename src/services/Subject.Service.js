import FetchService from "./Fetch.Service";

export default class SubjectService {
  config = useRuntimeConfig();
  baseUrl = this.config.public.apiBase;

  async getAll() {
    try {
      const subjects = await new FetchService().getData(
        this.baseUrl + "/subject/get-all"
      );

      return subjects;
    } catch (err) {
      return err;
    }
  }
}
