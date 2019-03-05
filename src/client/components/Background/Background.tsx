import * as React from 'react';
import styled from 'styled-components';

import { BackgroundPiece } from './BackgroundPiece';
import { getPieces, initialPieces, Piece } from './utils';

export const BackgroundContainer = styled.div`
  background-color: #000;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
`;

export const Background = () => {
  const [pieces, setPieces] = React.useState<Piece[]>(initialPieces);
  React.useEffect(() => {
    const newPieces = getPieces(pieces);
    setPieces(newPieces);
  }, [pieces]);
  return (
    <BackgroundContainer>
      <svg width="100%" height="100%" id="background">
        {pieces.map((d, i) => (
          <BackgroundPiece key={'piece-' + i} element={d.element} x={d.x} y={d.y} piece={i} rotate={d.rotate} />
        ))}
      </svg>
    </BackgroundContainer>
  );
};
