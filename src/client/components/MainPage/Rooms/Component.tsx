import * as React from 'react';
import { connect } from 'react-redux';

import { RoomReducerType } from '../../../reducers/rooms';
import { RoomType } from '../../../types';
import { RoomRow } from './RoomRow/Component';

interface RoomsProps {
  rooms: RoomType[];
}

export const Rooms: React.SFC<RoomsProps> = ({ rooms }) => (
  <div>
    {getRoomRows(rooms)}
  </div>
);

const getRoomRows = (rooms: RoomType[]): JSX.Element[] => rooms.map(d => (
  <RoomRow {...d} key={`room-_${d.id}`} />
));

const mapStateToProps = ({ room: { rooms }}: { room: RoomReducerType }) => ({ rooms });

export default connect(mapStateToProps)(Rooms);
