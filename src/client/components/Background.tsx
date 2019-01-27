import * as React from 'react';
import styled from 'styled-components';
import { BackgroundPiece } from './BackgroundPiece';

export const BackgroundContainer = styled.div`
  background-color: #000;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
`;

const random = () => Math.random() * window.innerWidth;

const randomizePiece = () => {
  const ran = Math.random();
  let element;
  if (ran < 0.18) {
    element = [[1, 1, 1], [0, 1, 0]];
  } else if (ran < 0.36) {
    element = [[1, 1, 0], [0, 1, 1]];
  } else if (ran < 0.54) {
    element = [[1, 1, 1], [1, 0, 0]];
  } else if (ran < 0.72) {
    element = [[1, 1, 1], [0, 0, 1]];
  } else if (ran < 90) {
    element = [[1, 1, 1, 1]];
  } else {
    element = [[1, 1], [1, 1]];
  }
  const speed = Math.min(Math.max(Math.random(), 0.2), 0.4);
  return {
    x: random(),
    y: random(),
    speedX: speed,
    speedY: speed,
    element,
    rotate: Math.min(Math.random() * 100, 360),
    changeRotate: ran > 0.5 ? 0.1 : -0.1
  };
};

const pieces = [
  randomizePiece(),
  randomizePiece(),
  randomizePiece(),
  randomizePiece(),
  randomizePiece(),
  randomizePiece(),
  randomizePiece(),
  randomizePiece(),
  randomizePiece(),
  randomizePiece(),
  randomizePiece(),
];

export const Background = () => {
  const [piece, setPieces] = React.useState(pieces);
  React.useEffect(() => {
      const newPieces = piece.map(d => {
        let newSpeedX, newSpeedY;
        if (d.x + d.speedX > window.innerWidth - 100 || d.x + d.speedX < 1) {
          newSpeedX = d.speedX * -1;
        } else {
          newSpeedX = d.speedX;
        }
        if (d.y + d.speedY > window.innerHeight - 100 || d.y + d.speedY < 1) {
          newSpeedY = d.speedY * -1;
        } else {
          newSpeedY = d.speedY;
        }
        const newX = d.x + newSpeedX;
        const newY = d.y + newSpeedY;
        let rotate = d.rotate + d.changeRotate;
        if (rotate > 360) {
          rotate = 0;
        }
        return {
          x: newX,
          y: newY,
          element: d.element,
          speedX: newSpeedX,
          speedY: newSpeedY,
          rotate,
          changeRotate: d.changeRotate
        };
      });
      setPieces(newPieces);
  });
  return (
    <BackgroundContainer>
      <svg width="100%" height="100%" id="background">
        {piece.map((d, i) => (
          <BackgroundPiece key={'piece-' + i} element={d.element} x={d.x} y={d.y} piece={i} rotate={d.rotate} />
        ))}
      </svg>
    </BackgroundContainer>
  );
};
