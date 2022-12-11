import FetchService from "./Fetch.Service";

export default class QuestionService {
  config = useRuntimeConfig();
  baseUrl = this.config.public.apiBase;

  async getAllQuestion() {
    try {
      let questions = {
        data: [],
      };
      let page = 1;

      while (true) {
        const questionData = await new FetchService().getData(
          this.baseUrl + "/question?page=" + page
        );
        questions.data = [...questions.data, ...questionData.data.data];

        if (questionData.data.lastPage === page) {
          break;
        } else {
          page++;
        }
      }

      return questions;
    } catch (err) {
      return err;
    }
  }

  async getQuestionByPageNumber(page) {
    try {
      const questions = await new FetchService().getData(
        this.baseUrl + "/question?page=" + page
      );

      return questions;
    } catch (err) {
      return err;
    }
  }

  async getQuestionById(id) {
    try {
      const questions = await new FetchService().getData(
        this.baseUrl + "/question?id=" + id
      );

      return questions;
    } catch (err) {
      return err;
    }
  }

  async deleteQuestionById(id) {
    try {
      const questions = await new FetchService().deleteData(
        this.baseUrl + "/question/delete?id=" + id
      );

      return questions;
    } catch (err) {
      return err;
    }
  }

  async create(questionData) {
    try {
      const response = await new FetchService().postData(
        this.baseUrl + "/question/create",
        questionData
      );

      return response;
    } catch (err) {
      return err;
    }
  }

  async update(questionData) {
    try {
      const response = await new FetchService().putData(
        this.baseUrl + "/question/edit",
        questionData
      );

      return response;
    } catch (err) {
      return err;
    }
  }
}
