import FetchService from "./Fetch.Service";

const fetchOne = async (id: number) => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBase;

  const modelTest = await new FetchService().getData(
    baseUrl + "/model-tests/" + id
  );

  return modelTest;
};

const fetchAll = async () => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBase;

  let modelTest = {
    data: [],
  };

  let page = 1;

  while (true) {
    const modelTestData = await new FetchService().getData(
      baseUrl + "/model-test/" + page
    );

    modelTest.data = [...modelTest.data, ...modelTestData.data.data];

    if (modelTestData.data.lastPage === page) {
      break;
    } else {
      page++;
    }
  }

  return modelTest;
};

const fetchByPageNumber = async (page: number) => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBase;

  const modelTest = await new FetchService().getData(
    baseUrl + "/model-tests?page=" + page
  );

  return modelTest;
};

export default { fetchOne, fetchAll, fetchByPageNumber };
