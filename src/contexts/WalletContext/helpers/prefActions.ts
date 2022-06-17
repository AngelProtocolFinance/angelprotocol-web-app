type Action = "connect" | "disconnect";

export function saveUserAction(key: string, action: Action) {
  sessionStorage.setItem(key, action);
}

export function retrieveUserAction(key: string): Action {
  return (sessionStorage.getItem(key) as Action) || "disconnect";
}
