const CITY_KEY = "poleno-city";
const DEFAULT_CITY = "zurich";

export const getCity = () => {
  if (typeof window === "undefined") {
    return DEFAULT_CITY;
  }
  return window.localStorage.getItem(CITY_KEY) || DEFAULT_CITY;
};

export const setCity = (city) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CITY_KEY, city);
  window.dispatchEvent(new Event("poleno-city-change"));
};

export const subscribeCity = (callback) => {
  if (typeof window === "undefined") return () => {};

  const handleStorage = (event) => {
    if (event.key === CITY_KEY) {
      callback(getCity());
    }
  };

  const handleLocal = () => callback(getCity());

  window.addEventListener("storage", handleStorage);
  window.addEventListener("poleno-city-change", handleLocal);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener("poleno-city-change", handleLocal);
  };
};
