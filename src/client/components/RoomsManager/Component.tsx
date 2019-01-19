import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { RoomReducerType } from '../../reducers/rooms';
import { RoomType } from '../../types';
import CreateRoomButton from './CreateRoomButton/Component';
import { RoomRow } from './RoomRow/Component';

interface RoomsProps {
  rooms: RoomType[];
}

const StyledContainer = styled.div`
  font-family: ${props => props.theme.fonts.text};
  font-size: 18px;
  font-weight: 300;
  position: absolute;
  background-color: #232323;
  color: #000;
  z-index: 10;
  top: 150px;
  left: 50%;
  transform: translate(-50%, 0);
  height: 70%;
  padding: 35px;
  width: 70%;
  max-width: 500px;
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

// this must be edited later (data is temp data)
export const RoomsManager: React.SFC<RoomsProps> = ({ rooms }) => (
  <StyledContainer>
    <StyledWrapper>
      {getRoomRows(rooms)}
    </StyledWrapper>
    <CreateRoomButton />
  </StyledContainer>
);

const getRoomRows = (rooms: RoomType[]): JSX.Element[] =>
  rooms.map((d, i) => <RoomRow {...d} key={`room-_${d.id}_${i}`} />);

const mapStateToProps = ({ room: { rooms } }: { room: RoomReducerType }) => ({ rooms });

export default connect(mapStateToProps)(RoomsManager);
