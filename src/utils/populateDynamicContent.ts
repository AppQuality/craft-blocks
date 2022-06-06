import flatten from "src/utils/flatten";

export const getTerm = (term: string, content: GenericApiResponse): string => {
  term = term.replace('{{', '').replace('}}', '');
  const contentTerm = term.split('.').reduce<string | GenericApiResponse>((acc, curr) => {
    if (typeof acc === 'string') {
      return acc;
    }
    if (typeof acc !== "undefined") {
      return acc[curr];
    }
    return "";
  }, content);
  return (typeof contentTerm === "string") ? contentTerm : "";
}

const populateDynamicContent = (text: string, content: GenericApiResponse): string => {
  const terms = flatten(content);
  terms.forEach((term) => {
    if (text.includes('{{' + term + '}}')) {
      text = text.replace('{{' + term + '}}', getTerm(term, content));
    }
  });
  return text;
};

export default populateDynamicContent;