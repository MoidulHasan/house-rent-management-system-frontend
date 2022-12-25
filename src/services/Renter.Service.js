import FetchService from "./Fetch.Service";



const fetchAll = async () => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;

    const response = await new FetchService().getData(
        apiUrl + "/renters/"
    );

    return response;
};

const Create = async (data) => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;

    const response = await new FetchService().postData(
        apiUrl + "/renters/", data
    );

    return response;
};


export default { fetchAll, Create };
