import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import styled from 'styled-components';

import GameController from '../components/Game/Control/GameController';
import Game from '../components/Game/Display/Game';
import LeaveRoomButton from '../components/Game/TopInfo/LeaveRoomButton';
import Spectres from '../components/Game/TopInfo/Spectres';

const BackgroundStyle = styled.div`
  background-color: #000;
  height: 100vh;
`;

const TopInfoContainer = styled.div`
  height: 10vh;
  width: 100%;
  border-bottom: 1px solid #fff;
  box-shadow: 0 10px 10px rgba(255,44,55,0.10), 0 5px 5px rgba(255,55,55,0.20);
  background-color: black;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const GameWrapper = styled.div`
  position: relative;
  height: 70vh;
  max-height: 1000px;
  width: 30%;
  min-width: 300px;
  max-width: 500px;
  margin: auto;
  margin-top: 30px;
  border: 1px solid #fff;
  box-shadow: 0 10px 10px rgba(255, 44, 55, 0.1), 0 5px 5px rgba(255, 55, 55, 0.2);
  background-color: #000;
`;

const ControlContainer = styled.div`
  height: 7vh;
  margin: auto;
  margin-top: 30px;
  width: 30%;
  min-width: 300px;
  max-width: 500px;
  box-shadow: 0 10px 10px rgba(255,44,55,0.10), 0 5px 5px rgba(255,55,55,0.20);
  background-color: #000;
  border: 1px solid #fff;
`;

interface Props {
  socket: SocketIOClient.Socket | null;
}

const GameContainer: React.SFC<Props> = ({ socket }) => {
  if (!socket) {
    return <Redirect to="/" />;
  }
  return <BackgroundStyle>
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
    </BackgroundStyle>;
};

const mapStateToProps = (state: any) => ({
  socket: state.app.socket
});

export default connect(mapStateToProps)(GameContainer);
