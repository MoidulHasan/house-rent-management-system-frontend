export default defineEventHandler(async (event) => {
  const headers = getHeaders(event);
  const query = getQuery(event);

  let questionQuery;

  if (query.page) questionQuery = "?page=" + (query.page ? query.page : "1");
  else if (query.id) questionQuery = "/" + query.id;

  const config = useRuntimeConfig();

  let res;

  try {
    await fetch(config.apiUrl + "admin/questions" + questionQuery, {
      method: "GET",
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
