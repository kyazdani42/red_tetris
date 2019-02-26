export const request = async (path: string, method: string): Promise<any> => {
  const url = getUrl(path);
  const response = await fetch(url, {
    method,
    mode: 'cors'
  });
  return response.json();
};

export const BACKEND_URL = 'http://localhost:3000';

export const getUrl = (path: string): string => `${BACKEND_URL}${path}`;

export const getEmitStringFromType = (type: keyType | null = null) => {
  switch (type) {
    case ' ':
      return 'goDown';
    case 'down':
      return 'moveDown';
    case 'up':
      return 'rotate';
    case 'left':
      return 'moveLeft';
    case 'right':
      return 'moveRight';
    default:
      return '';
  }
};
