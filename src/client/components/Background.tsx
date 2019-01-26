import * as React from 'react';
import styled from 'styled-components';

export const BackgroundContainer = styled.div`
  background-color: #000;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
`;

const random = () => Math.random() * 1000 % 400;

const pieces = [
  { x: random(), y: random(), speed: 0.1 },
  { x: random(), y: random(), speed: 0.2 },
  { x: random(), y: random(), speed: 0.2 },
  { x: random(), y: random(), speed: 0.3 },
  { x: random(), y: random(), speed: 0.2 },
  { x: random(), y: random(), speed: 0.1 },
  { x: random(), y: random(), speed: 0.4 },
  { x: random(), y: random(), speed: 0.4 },
  { x: random(), y: random(), speed: 0.4 },
  { x: random(), y: random(), speed: 0.4 },
  { x: random(), y: random(), speed: 0.4 },
  { x: random(), y: random(), speed: 0.4 },
  { x: random(), y: random(), speed: 0.4 },
  { x: random(), y: random(), speed: 0.3 },
  { x: random(), y: random(), speed: 0.2 },
];

export const Background = () => {
  const [piece, setPieces] = React.useState(pieces);
  const [rotate, setRotate] = React.useState(0);
  React.useEffect(() => {
      const newPieces = piece.map(d => {
        const newX = d.x + d.speed;
        const newY = d.y + d.speed;
        return {
          x: newX < window.innerWidth ? newX : 0,
          y: newY < window.innerHeight ? newY : 0,
          speed: d.speed
        };
      });
      setPieces(newPieces);
      setRotate(rotate + 0.1);
  });
  return (
    <BackgroundContainer>
      <svg width="100%" height="100%" id="background">
        {piece.map((d, i) => (
          <rect fill="red" width="40" height="40" x={d.x} y={d.y} key={i} />
        ))}
      </svg>
    </BackgroundContainer>
  );
};
