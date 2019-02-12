import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { State } from '../store';

interface Props {
  gameData: GameProps | null;
}

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
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
`;

const Piece = styled.div`
  width: calc(10% - 2px);
  border: solid 1px black;
  height: calc(5% - 2px);
  background-color: ${props => getColor(props.color as colorType)};
`;

export const Game: React.SFC<Props> = ({ gameData }) => {
  if (!gameData) return null;
  const divs = getDivsFromStack(gameData.stack);
  return (
    <Container>
      {divs}
    </Container>
  );
};

const getDivsFromStack = (stack: GameProps['stack']) => {
  const container = Array(200);
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 10; j++) {
      const containerIndex = +`${i}${j}`;
      container[containerIndex] = <Piece color={stack[i][j].color} key={'block' + containerIndex} />;
    }
  }
  return container;
};

const mapStateToProps = ({ app }: State) => ({
  gameData: app.gameData
});

export default connect(mapStateToProps)(Game);
