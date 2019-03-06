import * as React from 'react';
import styled from 'styled-components';

import { Block } from './Block';
import { GamePiecesContainer } from './styles';

interface Props {
  stack: GameProps['stack'];
}

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

export const GamePieces: React.SFC<Props> = ({ stack }) => {
  if (!stack.length) return null;
  return <GamePiecesContainer>{getDivsFromStack(stack)}</GamePiecesContainer>;
};
