import * as React from 'react';

import { ResultStyle, ResultWrapper } from './styles';

interface Props {
  winner: boolean;
}
export const Result: React.SFC<Props> = ({ winner }) => (
  <ResultWrapper>
    <ResultStyle winner={winner}>{winner ? 'You Win!' : 'Game Over!'}</ResultStyle>
  </ResultWrapper>
);
