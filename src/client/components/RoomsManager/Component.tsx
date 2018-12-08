import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { RoomReducerType } from '../../reducers/rooms';
import { RoomType } from '../../types';
import { RoomRow } from './RoomRow/Component';
import { data } from './rooms_data';

interface RoomsProps {
  rooms: RoomType[];
}

const StyledContainer = styled.div`
  position: relative;
  background-color: #fff;
  color: #000;
  z-index: 10;
  top: 50%;
  left: 50%;
  border-radius: 4px;
  height: 70%;
  transform: translate(-50%, -50%);
  padding: 35px;
  width: 70%;
  border: 1px solid rgba(0,0,0,0.1);
  box-shadow: 0 10px 10px rgba(255,44,55,0.10), 0 5px 5px rgba(255,55,55,0.10);
`;

const StyledWrapper = styled.div`
  position: relative;
  overflow-y: scroll;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 5px;
  border-radius: 5px;
`;

const RoomSeparator = styled.hr`
  border: none;
  height: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 20px 20px -20px #fff;
  margin: 0 auto 15px;
  padding: 0;
`;

// this must be edited later (data is temp data)
export const RoomsManager: React.SFC<RoomsProps> = ({ rooms }) => (
  <StyledContainer>
    <StyledWrapper>
      {rooms.length && getRoomRows(rooms) || getRoomRows(data as any)}
    </StyledWrapper>
  </StyledContainer>
);

const getRoomRows = (rooms: RoomType[]): JSX.Element[] => rooms.map((d, i) => (
  <React.Fragment key={`room-_${d.id}_${i}`}>
    <RoomRow {...d} />
    <RoomSeparator />
  </React.Fragment>
));

const mapStateToProps = ({ room: { rooms }}: { room: RoomReducerType }) => ({ rooms });

export default connect(mapStateToProps)(RoomsManager);
