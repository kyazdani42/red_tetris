import * as React from 'react';
import styled from 'styled-components';

interface Props {
  winner: boolean;
}

const ResultWrapper: any = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.1);
  user-select: none;
  pointer-events: none;
`;

const ResultStyle: any = styled.h1`
  color: ${(props: any) => (props.winner ? '#0bff40' : '#7a00ff')};
  font-size: 5vw;
  margin: auto;
  width: 500px;
  text-align: center;
  height: 50px;
  margin-top: 5%;
`;

export const Result: React.SFC<Props> = ({ winner }) => (
  <ResultWrapper>
    <ResultStyle winner={winner}>{winner ? 'You Win!' : 'Game Over!'}</ResultStyle>
  </ResultWrapper>
);
