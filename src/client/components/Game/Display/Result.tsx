import * as React from 'react';

import { ResultStyle } from './styles';

interface Props {
  winner: boolean;
}
export const Result: React.SFC<Props> = ({ winner }) => (
  <ResultStyle winner={winner}>{winner ? 'You Win!' : 'Game Over!'}</ResultStyle>
);
