import * as React from 'react';
import theme from '../../theme';

interface Props {
  element: number[][];
  x: number;
  y: number;
  piece: number;
  rotate: number;
}

export const BackgroundPiece: React.SFC<Props> = ({ element, x, y, piece, rotate }) => {
  return (
    <g transform={`translate(${x},${y}),rotate(${rotate})`}>
      {element.map((d, i) => {
        return d.map((n, j) => {
          if (n) {
            return (
              <rect
                will-change="transform"
                key={`rect-${i}-${j}-${piece}`}
                width="55"
                height="55"
                x={i * 55}
                y={j * 55}
                fill={theme.colors.primary.dark}
                stroke="black"
              />
            );
          } else {
            return null;
          }
        });
      })}
    </g>
  );
};
