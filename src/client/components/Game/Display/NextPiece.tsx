import * as React from 'react';

import { NextBlock } from './Block';
import { PieceContainer } from './styles';

interface Props {
  nextPiece: {
    color: string;
    patterns: number[][][];
  } | null;
}

export const NextPiece: React.SFC<Props> = ({ nextPiece }) => (
  <PieceContainer>
    {getBlocksFromPiece(nextPiece)}
  </PieceContainer>
);

const getBlocksFromPiece = (nextPiece: Props['nextPiece']) => {
  if (!nextPiece) return null;
  const piece = [];
  const len = nextPiece.patterns[0].length;
  for (let i = 0; i < 4; i++) {
    const line = i < len ? nextPiece.patterns[0][i] : null;
    for (let j = 0; j < 4; j++) {
      const blockValue = line ? j < line.length ? line[j] : 0 : 0;
      const key = `block${i}-${j}-next`;
      if (blockValue) {
        piece.push(<NextBlock color={nextPiece.color} key={key} />);
      } else {
        piece.push(<NextBlock color="black" key={key} />);
      }
    }
  }
  return piece;
};
