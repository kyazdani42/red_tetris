import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { State } from '../store';

import { Background } from '../components/Background/Background';
import CreateRoomButton from '../components/Home/CreateRoom';
import { RoomRow } from '../components/Home/RoomRow';

interface RoomsProps {
  playerName: string | null;
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
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const RowWrapperHideOverflow = styled.div`
  height: 88%;
  width: 90%;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const RowWrapper = styled.div`
  height: 100%;
  width: 100%;
  padding-right: 17px;
  overflow-y: scroll;
`;

export const RoomContainer: React.SFC<RoomsProps> = ({ rooms, socket, playerName }) => {
  if (socket) {
    const redirectUrl = `${socket.nsp}[${playerName}]`;
    return <Redirect to={redirectUrl} />;
  } else {
    return <RoomComponent rooms={rooms} />;
  }
};

export const RoomComponent: React.SFC<{ rooms: RoomsProps['rooms'] }> = ({ rooms }) => (
  <React.Fragment>
    <Background />
    <RoomWrapper>
      <StyledContainer>
        <RowWrapperHideOverflow>
          <RowWrapper>
            {getRoomRows(rooms)}
          </RowWrapper>
        </RowWrapperHideOverflow>
        <CreateRoomButton />
      </StyledContainer>
    </RoomWrapper>
  </React.Fragment>
);

export const getRoomRows = (rooms: RoomType[]): JSX.Element[] =>
  rooms.map((d, i) => <RoomRow {...d} key={`room-_${d.id}_${i}`} />);

const mapStateToProps = ({ app: { rooms, socket, playerName } }: State) => ({ rooms, socket, playerName });

export default connect(mapStateToProps)(RoomContainer);
