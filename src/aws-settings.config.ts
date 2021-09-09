// TCA Member's Login Auth Process
// after check useRequest hook, remove it
const TCAAuthProcess = async (password: string) => {
  const url = process.env.REACT_APP_AWS_TCA_LOGIN_URL;
  try {
    const response: any = await fetch(`${url}`, {
      method: "POST",
      body: JSON.stringify({ password: password }),
    });

    const data: { accessToken: string; errorMessage: string } =
      await response.json();
    if (data.accessToken) {
      console.log("Access Token: ", data.accessToken);
    } else {
      console.log("Error Message: ", data.errorMessage);
    }
  } catch (error) {
    console.error(error);
  }
};

export { TCAAuthProcess };
