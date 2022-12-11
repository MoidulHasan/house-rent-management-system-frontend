export default defineEventHandler(async (event) => {
  const headers = getHeaders(event);
  const question = await useBody(event.req);

  const config = useRuntimeConfig();

  let res;

  try {
    await fetch(config.apiUrl + "admin/questions", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        authorization: headers.authorization,
      },
      body: JSON.stringify(question),
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
