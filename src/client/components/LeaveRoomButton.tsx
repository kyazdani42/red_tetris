import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { leaveRoom } from '../actions/actions';

interface Props {
  dispatchLeaveRoom: () => void;
}

const Button = styled.div`
  height: 50px;
  width: 50px;
  background-color: ${props => props.theme.colors.primary.dark};
  border: 1px solid rgba(0,0,0,0.2);
  font-size: 17px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.05), 0 3px 6px rgba(0,0,0,0.13);
  padding-top: 1px;
  padding-left: 5px;
  margin-left: 3px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  align-content: center;
  transition: box-shadow 300ms;
  user-select: none;
  cursor: pointer;
  &:hover {
    box-shadow: 0 3px 6px rgba(0,0,0,0.2), 0 3px 6px rgba(0,0,0,0.3);
  };
`;

const LeaveRoomButton: React.SFC<Props> = ({ dispatchLeaveRoom }) => (
  <Button onClick={dispatchLeaveRoom}>X</Button>
);

const mapDispatchToProps = (dispatch: any) => ({
  dispatchLeaveRoom: () => dispatch(leaveRoom())
});

export default connect(undefined, mapDispatchToProps)(LeaveRoomButton);
