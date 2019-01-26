import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import CreateRoomButton from '../components/CreateRoom';
import { RoomRow } from '../components/RoomRow';
import { State } from '../reducers/rooms';
import { RoomType } from '../types';

interface RoomsProps {
  playerName: string;
  rooms: RoomType[];
  socket: SocketIOClient.Socket | null;
}

const StyledContainer = styled.div`
  font-family: ${props => props.theme.fonts.text};
  font-size: 18px;
  font-weight: 300;
  background-color: #232323;
  color: #000;

  z-index: 100;
  height: 70%;
  padding: 35px;
  width: 70%;
  max-width: 500px;
  margin: auto;
  margin-top: 50px;

  border-radius: 20px;
  border: 1px solid rgba(0,0,0,0.1);
  box-shadow: 0 10px 10px rgba(255,44,55,0.20), 0 5px 5px rgba(255,55,55,0.20);
  @media only screen and (max-height: 980px) {
    height: 55%;
  }
  transition: all 1s;
`;

const StyledWrapper = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #000;
  position: relative;
  overflow-y: scroll;
  height: 90%;
  width: 100%;
  box-sizing: border-box;
  padding: 5px;
  border-radius: 15px;
`;

export const RoomContainer: React.SFC<RoomsProps> = ({ rooms, socket, playerName }) => {
  if (socket) {
    const redirectUrl = `${socket.nsp}[${playerName}]`;
    return <Redirect to={redirectUrl} />;
  } else {
    return (
      <StyledContainer>
        <StyledWrapper>
          {getRoomRows(rooms)}
        </StyledWrapper>
        <CreateRoomButton />
      </StyledContainer>
    );
  }
};

const getRoomRows = (rooms: RoomType[]): JSX.Element[] =>
  rooms.map((d, i) => <RoomRow {...d} key={`room-_${d.id}_${i}`} />);

const mapStateToProps = ({ room: { rooms, socket, playerName } }: { room: State }) => ({ rooms, socket, playerName });

export default connect(mapStateToProps)(RoomContainer);
