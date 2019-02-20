import * as React from 'react';
import styled from 'styled-components';

import { NextBlock } from './Block';

interface Props {
  nextPiece: {
    color: string;
    patterns: number[][][];
  } | null;
}

const PieceContainer = styled.div`
  position: absolute;
  top: 41px;
  left: -173px;
  height: 170px;
  width: 170px;
  border: 1px solid #fff;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #000;
`;

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
