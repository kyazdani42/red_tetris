import * as React from 'react';
import { connect } from 'react-redux';

import Key from './Key';

import { State } from '../../../store';
import { BottomWrapper, ControllerWrapper, KeyWrapper } from './styles';
import { emitter, setWindowEvents } from './utils';

interface Props {
  socket: SocketIOClient.Socket;
}

const GameController: React.SFC<Props> = ({ socket }) => {
  const [click, setClick] = React.useState<keyType | null>(null);
  const emitAction = emitter(socket, setClick);
  React.useEffect(() => {
    const listener = setWindowEvents(emitAction);
    return () => window.removeEventListener('keydown', listener);
  }, []);
  return (
    <ControllerWrapper>
      <KeyWrapper>
        <Key type="up" keyPressed={click} emitter={emitAction('up')} />
        <BottomWrapper>
          <Key type="left" keyPressed={click} emitter={emitAction('left')} />
          <Key type="down" keyPressed={click} emitter={emitAction('down')} />
          <Key type="right" keyPressed={click} emitter={emitAction('right')} />
        </BottomWrapper>
      </KeyWrapper>
      <Key type=" " keyPressed={click} emitter={emitAction(' ')} />
    </ControllerWrapper>
  );
};

const mapStateToProps = (state: State) => ({
  socket: state.app.socket
});

export default connect(mapStateToProps)(GameController);
