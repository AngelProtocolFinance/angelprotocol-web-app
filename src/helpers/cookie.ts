export const bgCookies = {
  prefCode: "bg_pref_currency",
};

export const getCookie = (key: string): string | undefined => {
  const cookies = document.cookie.split(";").reduce(
    (prev, kvStr) => {
      const [k, v] = kvStr.trim().split("=");
      return { ...prev, [k]: v };
    },
    {} as Record<string, string>
  );
  return cookies[key];
};

export const setCookie = (key: string, value: string, path = "/"): void => {
  //this won't override the cookie, but append to the list instead
  document.cookie = `${key}=${value}; Secure; SameSite=None; Path=${path}`; //Domain = window.origin
};
