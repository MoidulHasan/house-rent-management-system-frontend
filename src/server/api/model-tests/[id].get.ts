export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const headers = getHeaders(event);

  const id = event.context.params.id;

  let res;
  await fetch(config.apiUrl + "admin/model-tests/" + id, {
    method: "GET",
    mode: "cors",
    headers: {
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
