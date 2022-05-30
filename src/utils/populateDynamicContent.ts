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

const populateDynamicContent = (text: string, terms: string[], content: GenericApiResponse): string => {
  terms.forEach((term) => {
    if (text.includes('{{' + term + '}}')) {
      text = text.replace('{{' + term + '}}', getTerm(term, content));
    }
  });
  return text;
};

export default populateDynamicContent;