export default defineEventHandler(async (event) => {

  const requestPaylod = await useBody(event.req);

  const config = useRuntimeConfig();
  
  try {
    const response = await fetch(config.apiUrl + "auth/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(requestPaylod),
    });

    const result = await response.json();

    const cookieOpts = {
      expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
      httpOnly: true,
    };

    setCookie(event, "logged_in", "true", cookieOpts);
    setCookie(event, "logged_user", JSON.stringify(result.data.user), cookieOpts);

    return result;

  } catch (err) {

    return err;

  }

});
