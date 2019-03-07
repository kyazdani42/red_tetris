import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import GameController from '../components/Game/Control/GameController';
import Game from '../components/Game/Display/Game';
import LeaveRoomButton from '../components/Game/TopInfo/LeaveRoomButton';
import Spectres from '../components/Game/TopInfo/Spectres';
import { BackgroundStyle, ControlContainer, GameWrapper, TopInfoContainer } from './styles';

interface Props {
  socket: SocketIOClient.Socket | null;
}

export const GameContainer: React.SFC<Props> = ({ socket }) => socket ? <GameComponent /> : <Redirect to="/" />;

export const GameComponent = () => (
  <BackgroundStyle>
    <TopInfoContainer>
      <Spectres />
      <LeaveRoomButton />
    </TopInfoContainer>
    <GameWrapper>
      <Game />
    </GameWrapper>
    <ControlContainer>
      <GameController />
    </ControlContainer>
  </BackgroundStyle>
);

const mapStateToProps = (state: any) => ({
  socket: state.app.socket
});

export default connect(mapStateToProps)(GameContainer);
