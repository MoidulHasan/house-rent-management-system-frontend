export default defineEventHandler(async (event) => {
  const body = await useBody(event.req);
  const headers = getHeaders(event);

  const config = useRuntimeConfig();

  let res;

  try {
    await fetch(config.apiUrl + "admin/previous-questions", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        authorization: headers.authorization,
      },
      body: JSON.stringify(body),
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
