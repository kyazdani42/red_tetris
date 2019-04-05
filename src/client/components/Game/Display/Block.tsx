import * as React from 'react';

export const NextBlock = (color: string, key: string) => (
  <div
    style={{
      backgroundColor: color,
      border: '1px solid black',
      width: 'calc(25% - 2px)',
      height: 'calc(25% - 2px)'
    }}
    key={key}
  />
);

export const Block = (color: string, key: string) => (
  <div
    style={{
      backgroundColor: color,
      border: '1px solid black',
      width: 'calc(10% - 2px)',
      height: 'calc(5% - 2px)'
    }}
    key={key}
  />
);
