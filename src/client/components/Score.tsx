import * as React from 'react';
import styled from 'styled-components';

const ScoreStyle = styled.div`
  position: absolute;
  top: -1px;
  left: -102px;
  color: #fff;
  background-color: #000;
  border: 1px solid #fff;
  height: 40px;
  width: 100px;
`;

interface Props {
  score: number;
}

export const Score: React.SFC<Props> = ({ score }) => (
  <ScoreStyle>
    score: {score}
  </ScoreStyle>
);
