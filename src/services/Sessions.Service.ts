import FetchService from "./Fetch.Service";

const fetch = async () => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBase;

  const sessions = await new FetchService().getData(baseUrl + "/sessions");

  return sessions;
};

export default { fetch };
