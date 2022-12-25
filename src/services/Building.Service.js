import FetchService from "./Fetch.Service";

// const fetchOne = async (id: number) => {
//     const config = useRuntimeConfig();
//     const baseUrl = config.public.apiBase;

//     const modelTest = await new FetchService().getData(
//         baseUrl + "/model-tests/" + id
//     );

//     return modelTest;
// };

const fetchAll = async () => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;

    const response = await new FetchService().getData(
        apiUrl + "/building/"
    );


    return response;
};

const fetchOne = async (Building_Name) => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;

    const response = await new FetchService().getData(
        apiUrl + "/building/" + Building_Name
    );


    return response;
};

const Create = async (data) => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;

    const response = await new FetchService().postData(
        apiUrl + "/building/", data
    );

    return response;
};

const Update = async (id, data) => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;

    const response = await new FetchService().putData(
        apiUrl + "/building/" + id, data
    );

    return response;
};

const Delete = async (id) => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;

    const response = await new FetchService().deleteData(
        apiUrl + "/building/" + id
    );

    return response;
};

// const fetchByPageNumber = async (page: number) => {
//     const config = useRuntimeConfig();
//     const baseUrl = config.public.apiBase;

//     const modelTest = await new FetchService().getData(
//         baseUrl + "/model-tests?page=" + page
//     );

//     return modelTest;
// };

export default { fetchAll, fetchOne, Create, Update, Delete };
