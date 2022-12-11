export default defineEventHandler(async (event) => {
  const headers = getHeaders(event);

  const config = useRuntimeConfig();

  let res;

  try {
    await fetch(config.apiUrl + "admin/institutes", {
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
