export const request = (path: string, method: string): Promise<any> => {
  const url = `http://localhost:3000${path}`;
  return fetch(url, {
    method,
    mode: 'cors'
  })
  .then(res => res.json());
};
