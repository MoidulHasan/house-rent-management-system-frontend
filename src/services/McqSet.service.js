import FetchService from "./Fetch.Service";

export default class McqSetService {
  config = useRuntimeConfig();
  baseUrl = this.config.public.apiBase;

  async getAll() {
    try {
      const mcqSet = await new FetchService().getData(
        this.baseUrl + "/mcq-set/get-all"
      );

      return mcqSet;
    } catch (err) {
      return err;
    }
  }

  //   async getQuestionByPageNumber(page) {
  //     try {
  //       const questions = await new FetchService().getData(
  //         this.baseUrl + "/question?page=" + page
  //       );

  //       return questions;
  //     } catch (err) {
  //       return err;
  //     }
  //   }

  //   async deleteQuestionById(id) {
  //     try {
  //       const questions = await new FetchService().deleteData(
  //         this.baseUrl + "/question/delete?id=" + id
  //       );

  //       return questions;
  //     } catch (err) {
  //       return err;
  //     }
  //   }
}
