import * as React from 'react';
import styled, { withTheme } from 'styled-components';
import { createCube, drawTitle } from './utils';

const BackgroundContainer = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000;
`;

export const BackgroundCanvas = withTheme(({ theme }: any) => {

  React.useEffect(() => {
    initBackgroundCanvasProperties(theme.colors);
    window.addEventListener('resize', () => initBackgroundCanvasProperties(theme.colors));
  }, []);

  return <BackgroundContainer id="bg-anim" />;
});

const initBackgroundCanvasProperties = (colors: any) => {
  const canvas: any = document.getElementById('bg-anim');
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawTitle(canvas, ctx, colors);
  createCube(ctx);
};
