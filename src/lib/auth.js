const SESSION_KEY = "poleno-session";
const DEMO_SESSION = "demo";

export const isLoggedIn = () => {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(SESSION_KEY) === DEMO_SESSION;
};

export const login = (email, password) => {
  if (typeof window === "undefined") return false;
  const isValid =
    email === "demo@swisens.ch" && password === "mpswisens";

  if (isValid) {
    window.localStorage.setItem(SESSION_KEY, DEMO_SESSION);
  }

  return isValid;
};

export const logout = () => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_KEY);
};
