const nltAPI = 'https://api.nlt.to/api/';
const key = import.meta.env.VITE_NLT_API_KEY;

export const getText = (query) => {
  const url = `${nltAPI}/passages?ref=${ encodeURIComponent(query) }&version=ntv&key=${key}`;
  return fetch(url);
}