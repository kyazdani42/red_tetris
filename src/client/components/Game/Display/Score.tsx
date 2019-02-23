import * as React from 'react';

import { ScoreStyle } from './styles';

interface Props {
  score: number;
}

export const Score: React.SFC<Props> = ({ score }) => (
  <ScoreStyle>
    score: {score}
  </ScoreStyle>
);
