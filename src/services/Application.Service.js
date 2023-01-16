import FetchService from "./Fetch.Service";


const Create = async (data) => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;

    const response = await new FetchService().postData(
        apiUrl + "/application/", data
    );

    return response;
};


const Cancel = async (application_id, user_id) => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;

    const response = await new FetchService().deleteData(
        apiUrl + "/application/" + application_id + '?user_id=' + user_id
    );

    return response;
}

export default { Create, Cancel };
