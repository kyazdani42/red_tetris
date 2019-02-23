import * as React from 'react';
import { connect } from 'react-redux';

import { leaveRoom } from '../../../actions/actions';
import { LeaveButtonStyle } from './styles';

interface Props {
  dispatchLeaveRoom: () => void;
}

const LeaveRoomButton: React.SFC<Props> = ({ dispatchLeaveRoom }) => (
  <LeaveButtonStyle onClick={dispatchLeaveRoom}>Quit</LeaveButtonStyle>
);

const mapDispatchToProps = (dispatch: any) => ({
  dispatchLeaveRoom: () => dispatch(leaveRoom())
});

export default connect(undefined, mapDispatchToProps)(LeaveRoomButton);
