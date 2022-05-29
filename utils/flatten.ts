/*
   * Given an object like { profile: { name: "Pippo", surname: "Franco", country: {city: "Milano", province: "Milano"} } };
   * it returns an array of strings ["profile.name", "profile.surname", "profile.country.city", "profile.country.province"]
   */
const flatten = (obj: {[key: string]: any}): string[] => {
  return Object.keys(obj).reduce<string[]>((accumulator, key) => {
    if (typeof obj[key] === "object") {
      let subKeys = flatten(obj[key]); // ['city', 'province']
      subKeys = subKeys.map((subKey) => `${key}.${subKey}`); // ["country.city", "country.province"]
      return [...accumulator, ...subKeys];
    }
    if (typeof obj[key] === "string") {
      return [...accumulator, key];
    }
    return [...accumulator];
  }, []);
};

export default flatten;