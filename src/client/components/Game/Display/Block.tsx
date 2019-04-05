import * as React from 'react';

export const NextBlock = (color: string, key: string) => (
  <div
    style={{
      backgroundColor: changeBlockColor(color),
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
      backgroundColor: changeBlockColor(color),
      border: '1px solid black',
      width: 'calc(10% - 2px)',
      height: 'calc(5% - 2px)'
    }}
    key={key}
  />
);

export const changeBlockColor = (color: string) => {
  switch (color) {
    case 'skyBlue':
     return '#adf0ff';
    case 'blue':
      return '#7427CC';
    case 'orange':
      return '#EF6A00';
    case 'yellow':
      return '#FFC851';
    case 'green':
      return '#EFA300';
    case 'purple':
      return '#650000';
    case 'red':
      return '#B11515';
    default:
      return color;
  }
};
