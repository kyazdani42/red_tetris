import * as React from 'react';
import { connect } from 'react-redux';

import { State } from '../../../store';
import { StartButtonStyle } from './styles';

interface Props {
  socket: SocketIOClient.Socket;
  options: Options;
}

export const StartButton: React.SFC<Props> = ({ socket, options }) => (
  <StartButtonStyle onClick={() => socket.emit('start', options)}>
    start
  </StartButtonStyle>
);

const mapStateToProps = (state: State) => ({
  options: state.app.options
});

export default connect(mapStateToProps)(StartButton);
