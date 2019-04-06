import * as React from 'react';

import { ScoreStyle } from './styles';

interface Props {
  score: number;
  bestScore: number;
}

export const Score: React.SFC<Props> = ({ score, bestScore }) => (
  <ScoreStyle>
    score: {score},
    {' '}
    {' '}
    best score: {bestScore}
  </ScoreStyle>
);
