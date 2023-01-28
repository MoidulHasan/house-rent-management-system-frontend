import FetchService from "./Fetch.Service";


const fetchAll = async () => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;

    const response = await new FetchService().getData(
        apiUrl + "/apartments/"
    );

    return response;
};


const Create = async (apartmentId, data) => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;

    const response = await new FetchService().postData(
        apiUrl + "/apartments/" + apartmentId + "/bill", data
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

const Update = async (apartmentId, billId, billData) => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;


    const response = await new FetchService().putData(
        apiUrl + "/apartments/" + apartmentId + "/bill/" + billId, billData
    );

    return response;
};


const acceptPayment = async (apartmentId, billId) => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;

    const response = await new FetchService().getData(
        apiUrl + "/apartments/" + apartmentId + "/bill/accept/" + billId
    );

    return response;
}


export default { fetchAll, Create, Delete, Update, acceptPayment };
