import { BOOK_LIST } from "../constants/books";

export const processQueryParts = (query) => {
  let name = '';
  let chapter = '1';
  
  const queryParts = query.toLowerCase().split(' ');

  if (queryParts.length === 1) {
    name = queryParts[0];
  }

  if (queryParts.length === 2) {
    if (Number.isNaN(Number(queryParts[0]))) {
      name = queryParts[0]
      chapter = queryParts[1];
    } else {
      name = `${queryParts[0]} ${queryParts[1]}`;
    }
  }
  
  if (queryParts.length > 2) {
    name = queryParts.slice(0, -1).join(' ')
    chapter = queryParts[queryParts.length - 1];
  }

  const bookName = BOOK_LIST.find(item => item.normalized === name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))?.name;

  return {
    bookName,
    chapter,
    processedQuery: `${bookName} ${chapter}`,
  };
}