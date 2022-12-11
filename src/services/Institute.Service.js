import FetchService from "./Fetch.Service";

export default class InstituteService {
  config = useRuntimeConfig();
  baseUrl = this.config.public.apiBase;

  async getAll() {
    try {
      const mcqSet = await new FetchService().getData(
        this.baseUrl + "/institute/get-all"
      );

      return mcqSet;
    } catch (err) {
      return err;
    }
  }
}
