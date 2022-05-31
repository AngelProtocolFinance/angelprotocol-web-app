type Action = "connect" | "disconnect";

export function saveUserAction(key: string, action: Action) {
  localStorage.setItem(key, action);
}

export function retrieveUserAction(key: string): Action {
  return (localStorage.getItem(key) as Action) || "disconnect";
}
