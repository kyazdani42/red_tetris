export interface Piece {
  x: number;
  y: number;
  element: number[][];
  speedX: number;
  speedY: number;
  rotate: number;
  changeRotate: number;
}

export const getPieces = (pieces: Piece[]): Piece[] =>
  pieces.map(d => {
    let newSpeedX, newSpeedY;
    if (d.x + d.speedX > window.innerWidth - 100 || d.x + d.speedX < 10) {
      newSpeedX = d.speedX * -1;
    } else {
      newSpeedX = d.speedX;
    }
    if (d.y + d.speedY > window.innerHeight - 100 || d.y + d.speedY < 10) {
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

export const randomizePiece = (): Piece => {
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

const random = (): number => Math.random() * window.innerWidth;

export const initialPieces: Piece[] = [...Array(20)].map(_ => randomizePiece());
