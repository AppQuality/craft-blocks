import flatten from "src/utils/flatten";

const getTerm = (term: string, content: GenericApiResponse): string => {
  const contentTerm = term.split('.').reduce<string | GenericApiResponse>((acc, curr) => {
    if (typeof acc === 'string') {
      return acc;
    } else {
      return acc[curr];
    }
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