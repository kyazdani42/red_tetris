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

const RoomWrapper = styled.div`
  position: relative;
`;

const StyledContainer = styled.div`
  font-family: ${props => props.theme.fonts.text};
  font-size: 18px;
  font-weight: 300;
  background-color: #000;
  color: #000;

  z-index: 100;
  height: 80vh;
  width: 70vw;
  margin: 10vh auto auto;
  max-width: 500px;
  border: 1px solid rgba(255,69,100,0.4);
  box-shadow: 0 10px 10px rgba(255,44,55,0.20), 0 5px 5px rgba(255,55,55,0.20);
  transition: all 1s;
  align-self: flex-end;
`;

const RowWrapper = styled.div`
  height: 88%;
  width: 94%;
  margin: 3% auto auto;
  border: 1px solid rgba(255, 255, 255, 0.05);
  overflow-y: scroll;
  overflow: -moz-hidden-unscrollable;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const RoomContainer: React.SFC<RoomsProps> = ({ rooms, socket, playerName }) => {
  if (socket) {
    const redirectUrl = `${socket.nsp}[${playerName}]`;
    return <Redirect to={redirectUrl} />;
  } else {
    return (
      <RoomWrapper>
        <StyledContainer>
          <RowWrapper>
            {getRoomRows(rooms)}
          </RowWrapper>
          <CreateRoomButton />
        </StyledContainer>
      </RoomWrapper>
    );
  }
};

const getRoomRows = (rooms: RoomType[]): JSX.Element[] =>
  rooms.map((d, i) => <RoomRow {...d} key={`room-_${d.id}_${i}`} />);

const mapStateToProps = ({ room: { rooms, socket, playerName } }: { room: State }) => ({ rooms, socket, playerName });

export default connect(mapStateToProps)(RoomContainer);
