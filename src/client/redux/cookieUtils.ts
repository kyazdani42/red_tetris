import Cookies from 'universal-cookie';

export const getDataFromCookie = (): { playerName: string | null, token: string | null } => {
  const cookie = new Cookies();
  const value = cookie.get('red_tetris_player');
  if (!value) {
    return { playerName: null, token: null };
  }
  return value;
};

export const setCookie = (playerName: string, token: string) => {
  const cookie = new Cookies();
  const value = JSON.stringify({ playerName, token });
  if (token) {
    cookie.set('red_tetris_player', value);
  }
};
