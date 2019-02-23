import * as React from 'react';
import styled from 'styled-components';

const getColor = (color: colorType) => {
  switch (color) {
    case 'black':
      return '#000';
    case 'grey':
      return '#333';
    case 'red':
      return '#b71c1c';
    case 'blue':
      return '#661010';
    case 'green':
      return '#E52323';
    case 'orange':
      return '#F22525';
    case 'purple':
      return '#CC1F1F';
    case 'skyBlue':
      return '#CC3627';
    case 'yellow':
      return '#661B14';
  }
};

const BlockStyle = styled.div`
  width: calc(10% - 2px);
  border: solid 1px black;
  height: calc(5% - 2px);
  background-color: ${props => getColor(props.color as colorType)};
`;

const NextBlockStyle: any = styled.div`
  width: calc(25% - 2px);
  border: solid 1px black;
  height: calc(25% - 2px);
  background-color: ${props => getColor(props.color as colorType)};
`;

interface Props {
  color: string;
}

export const NextBlock: React.SFC<Props> = ({ color }) => (
  <NextBlockStyle color={color} />
);

export const Block: React.SFC<Props> = ({ color }) => (
  <BlockStyle color={color} />
);
