import * as React from 'react';
import styled from 'styled-components';

const BackgroundContainer = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000;
`;

export const BackgroundCanvas = () => {

  React.useEffect(() => {
    initBackgroundCanvasProperties();
    window.addEventListener('resize', initBackgroundCanvasProperties);
  }, []);

  return <BackgroundContainer id="bg-anim" />;
};

const initBackgroundCanvasProperties = () => {
  const canvas: any = document.getElementById('bg-anim');
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createCube(ctx);
};

const createCube = (ctx: CanvasRenderingContext2D) => {
  if (ctx) {}
  // ctx.fillStyle = 'rgb(233, 133, 44)';
  // ctx.fillRect(0, 0, 100, 100);
};
