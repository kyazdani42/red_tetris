import * as React from 'react';
import { connect } from 'react-redux';

import { handleJoinRoom } from '../../../../actions/room';

interface Props {
  joinRoom: (id: string) => void;
  roomId: string;
}

export const JoinButton: React.SFC<Props> = ({ joinRoom, roomId }) => (
  <div onClick={() => joinRoom(roomId)} />
);

const mapStateToProps = (_: any, { roomId }: { roomId: string }) => ({
  roomId
});

const mapDispatchToProps = (dispatch: any) => ({
  joinRoom: dispatch(handleJoinRoom())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JoinButton);
