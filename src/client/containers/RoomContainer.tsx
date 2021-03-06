import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { State } from '../redux/store';

import CreateRoomButton from '../components/Home/CreateRoom';
import PlayerScore from '../components/Home/PlayerScore';
import { RoomRow } from '../components/Home/RoomRow';
import ScoreButton from '../components/Home/ScoreButton';
import ScoreDisplay from '../components/Home/ScoreDisplay';
import { RoomWrapper, RowWrapper, RowWrapperHideOverflow } from './styles';

interface RoomsProps {
  playerName: string | null;
  rooms: RoomType[];
  socket: SocketIOClient.Socket | null;
}
export const RoomContainer: React.SFC<RoomsProps> = ({ rooms, socket, playerName }) => {
  if (socket) {
    const redirectUrl = `${socket.nsp}[${playerName}]`;
    return <Redirect to={redirectUrl} />;
  } else {
    return <RoomComponent rooms={rooms} />;
  }
};

export const RoomComponent: React.SFC<{ rooms: RoomsProps['rooms'] }> = ({ rooms }) => (
  <RoomWrapper>
    <RowWrapperHideOverflow>
      <RowWrapper>
        {getRoomRows(rooms)}
      </RowWrapper>
    </RowWrapperHideOverflow>
    <CreateRoomButton />
    <ScoreButton />
    <ScoreDisplay />
    <PlayerScore />
  </RoomWrapper>
);

export const getRoomRows = (rooms: RoomType[]): JSX.Element[] =>
  rooms.map((d, i) => <RoomRow {...d} key={`room-_${d.name}_${i}`} />);

export const mapStateToProps = ({ app: { rooms, socket, playerName } }: State) => ({ rooms, socket, playerName });

export default connect(mapStateToProps)(RoomContainer);
