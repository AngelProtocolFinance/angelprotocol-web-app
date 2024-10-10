export const toState = (state: object | undefined): string => {
  if (!state) return "";
  return btoa(JSON.stringify(state));
};

export const fromState = <T>(base64: string | null) => {
  try {
    if (!base64) return null;
    return JSON.parse(atob(base64)) as T;
  } catch (err) {
    console.error(err);
    return null;
  }
};
