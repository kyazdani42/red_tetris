import * as React from 'react';
import styled from 'styled-components';

import { Block } from './Block';

interface Props {
  stack: GameProps['stack'];
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
`;

const getDivsFromStack = (stack: GameProps['stack']) => {
  const container = Array(200);
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 10; j++) {
      const containerIndex = +`${i}${j}`;
      container[containerIndex] = (
        <Block color={stack[i][j].color} key={'block' + containerIndex} />
      );
    }
  }
  return container;
};

export const GamePieces: React.SFC<Props> = ({ stack }) => (
  <Container>{getDivsFromStack(stack)}</Container>
);
