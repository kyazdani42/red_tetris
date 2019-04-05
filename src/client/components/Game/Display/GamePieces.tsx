import * as React from 'react';

import { Block } from './Block';
import { GamePiecesContainer } from './styles';

interface Props {
  stack: GameProps['stack'];
}

export const getDivsFromStack = (stack: GameProps['stack']) => {
  const container = Array(200);
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 10; j++) {
      const containerIndex = +`${i}${j}`;
      container[containerIndex] = (
        Block(stack[i][j].color, containerIndex + 'indexKey')
      );
    }
  }
  return container;
};

export const GamePieces: React.SFC<Props> = ({ stack }) => (
  <GamePiecesContainer>{getDivsFromStack(stack)}</GamePiecesContainer>
);
