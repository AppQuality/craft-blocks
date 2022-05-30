/*
   * Given an object like { profile: { name: "Pippo", surname: "Franco", country: {city: "Milano", province: "Milano"} } };
   * it returns an array of strings ["profile.name", "profile.surname", "profile.country.city", "profile.country.province"]
   */
const flatten = (obj: GenericApiResponse): string[] => {
  return Object.keys(obj).reduce<string[]>((accumulator, key) => {
    if (typeof obj[key] === "string") {
      return [...accumulator, key];
    } else {
      let subKeys = flatten(obj[key] as GenericApiResponse); // ['city', 'province']
      subKeys = subKeys.map((subKey) => `${key}.${subKey}`); // ["country.city", "country.province"]
      return [...accumulator, ...subKeys];
    }
  }, []);
};

export default flatten;