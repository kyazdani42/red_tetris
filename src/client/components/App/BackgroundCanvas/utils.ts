import { colors } from './constants';

export const drawTitle = (canvas: any, ctx: CanvasRenderingContext2D) => {
  ctx.strokeStyle = colors.primary.dark;
  ctx.font = '80px serif';
  ctx.strokeText('Red Tetris', canvas.width / 2 - 180, 90);
  ctx.fillStyle = colors.primary.normal;
  ctx.fillText('Red Tetris', canvas.width / 2 - 175, 92);
}

export const createCube = (ctx: CanvasRenderingContext2D) => {
  if (ctx) {}
  // ctx.fillStyle = 'rgb(233, 133, 44)';
  // ctx.fillRect(0, 0, 100, 100);
};
