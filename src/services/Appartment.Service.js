import FetchService from "./Fetch.Service";


const fetchAll = async () => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;

    const response = await new FetchService().getData(
        apiUrl + "/apartments/"
    );

    return response;
};


const Create = async (data) => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;

    const response = await new FetchService().postData(
        apiUrl + "/apartments/", data
    );

    return response;
};

const Delete = async (id) => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;

    const response = await new FetchService().deleteData(
        apiUrl + "/apartments/" + id
    );

    return response;
};

const Update = async (id, data) => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;

    const response = await new FetchService().putData(
        apiUrl + "/apartments/" + id, data
    );

    return response;
};


export default { fetchAll, Create, Delete, Update };
