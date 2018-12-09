import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { RoomReducerType } from '../../reducers/rooms';
import { RoomType } from '../../types';
import { CreateRoomButton } from './CreateRoomButton/Component';
import { RoomRow } from './RoomRow/Component';
import { data } from './rooms_data';

interface RoomsProps {
  rooms: RoomType[];
}

const StyledContainer = styled.div`
  position: absolute;
  background-color: #fff;
  color: #000;
  z-index: 10;
  top: 120px;
  left: 50%;
  height: 70%;
  transform: translate(-50%, 0);
  padding: 35px;
  width: 70%;
  max-width: 800px;
  border: 1px solid rgba(0,0,0,0.1);
  box-shadow: 0 10px 10px rgba(255,44,55,0.20), 0 5px 5px rgba(255,55,55,0.20);
`;

const StyledWrapper = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: grid;
  background-color: rgba(255, 10,10,0.02);
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 15px;
  grid-template-rows: 180px;
  position: relative;
  overflow-y: scroll;
  height: 90%;
  width: 100%;
  box-sizing: border-box;
  padding: 5px;
  border-radius: 3px;
`;

// this must be edited later (data is temp data)
export const RoomsManager: React.SFC<RoomsProps> = ({ rooms }) => (
  <StyledContainer>
    <StyledWrapper>
      {rooms.length && getRoomRows(rooms) || getRoomRows(data as any)}
    </StyledWrapper>
    <CreateRoomButton />
  </StyledContainer>
);

const getRoomRows = (rooms: RoomType[]): JSX.Element[] =>
  rooms.map((d, i) => <RoomRow {...d} key={`room-_${d.id}_${i}`} />);

const mapStateToProps = ({ room: { rooms }}: { room: RoomReducerType }) => ({ rooms });

export default connect(mapStateToProps)(RoomsManager);
