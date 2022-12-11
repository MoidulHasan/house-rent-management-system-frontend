export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const headers = getHeaders(event);
  const queryStartingIndex = event.req.url.indexOf("?");

  const queryString =
    queryStartingIndex !== -1
      ? event.req.url.slice(queryStartingIndex, event.req.url.length)
      : "";

  let res;
  await fetch(config.apiUrl + "admin/sessions/" + queryString, {
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

  return res;
});
