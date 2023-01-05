type Action = "connect" | "disconnect";

export function saveUserAction(key: string, action: Action) {
  window.localStorage.setItem(key, action);
}

export function retrieveUserAction(key: string): Action {
  return (window.localStorage.getItem(key) as Action) || "disconnect";
}
