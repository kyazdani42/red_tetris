import * as React from 'react';
import { RoomType } from '../../../types';
import { connect } from 'react-redux';
import { RoomReducerType } from '../../../reducers/rooms';
import { RoomRow } from './RoomRow/Component';

interface RoomsProps {
  rooms: RoomType[];
}

export const Rooms: React.SFC<RoomsProps> = ({ rooms }) => (
  <div>
    {getRoomRows(rooms)}
  </div>
);

const getRoomRows = (rooms: RoomType[]) => rooms.map(d => (
  <RoomRow {...d} key={`room-_${d.id}`} />
));

const mapStateToProps = ({ room }: { room: RoomReducerType }) => ({
  rooms: room.rooms
})

export default connect(mapStateToProps)(Rooms);
