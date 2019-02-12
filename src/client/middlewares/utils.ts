export const BACKEND_URL = 'http://localhost:3000';

export const request = (path: string, method: string): Promise<any> => {
  const url = `${BACKEND_URL}${path}`;
  return fetch(url, {
    method,
    mode: 'cors'
  })
  .then(res => res.json());
};
