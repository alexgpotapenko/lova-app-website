import de from "./de";
import en from "./en";

const dictionaries = { de, en };
const DEFAULT_LOCALE = "de";

let currentLocale = DEFAULT_LOCALE;

export const setLocale = (locale) => {
  if (dictionaries[locale]) {
    currentLocale = locale;
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("poleno-locale-change"));
    }
  }
};

export const t = (key) => {
  const dict = dictionaries[currentLocale] || dictionaries[DEFAULT_LOCALE];
  return dict[key] || dictionaries[DEFAULT_LOCALE][key] || key;
};

export const getLocale = () => currentLocale;
export const locales = Object.keys(dictionaries);

export const subscribeLocale = (callback) => {
  if (typeof window === "undefined") return () => {};

  const handleLocale = () => callback(getLocale());
  window.addEventListener("poleno-locale-change", handleLocale);

  return () => window.removeEventListener("poleno-locale-change", handleLocale);
};
