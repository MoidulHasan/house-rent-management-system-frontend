import FetchService from "./Fetch.Service";


const Create = async (data) => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;

    const response = await new FetchService().postData(
        apiUrl + "/application/", data
    );

    return response;
};


const Cancel = async (application_id, apartment_id) => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;

    const response = await new FetchService().deleteData(
        apiUrl + "/application/" + application_id + '?apartment_id=' + apartment_id
    );

    return response;
}

const fetchAll = async () => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;

    const response = await new FetchService().getData(
        apiUrl + "/application/"
    );

    return response;
};



const Accept = async (id) => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;

    const response = await new FetchService().putData(
        apiUrl + "/application/" + id, {
        operation: 'accept'
    }
    );

    return response;
};


const Reject = async (id) => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;

    const response = await new FetchService().putData(
        apiUrl + "/application/" + id, {
        operation: 'reject'
    }
    );

    return response;
};



export default { Create, Cancel, fetchAll, Accept, Reject };
