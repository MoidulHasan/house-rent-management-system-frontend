export default defineEventHandler(async (event) => {
  const headers = getHeaders(event);
  const query = getQuery(event);

  const config = useRuntimeConfig();

  let res;

  try {
    await fetch(config.apiUrl + "admin/questions/" + query?.id, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        authorization: headers.authorization,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        res = data;
      });
  } catch (err) {
    res = err;
  }

  return res;
});
