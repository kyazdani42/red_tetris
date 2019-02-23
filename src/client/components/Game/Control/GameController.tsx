import * as React from 'react';
import { connect } from 'react-redux';

import Key from './Key';

import { State } from '../../../store';
import { ControlInfoStyle, ControllerWrapper, KeySubWrapper, KeyWrapper } from './styles';
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
        <KeySubWrapper>
          <Key type="left" keyPressed={click} emitter={emitAction('left')} />
          <ControlInfoStyle>left</ControlInfoStyle>
        </KeySubWrapper>
        <KeySubWrapper>
          <Key type="right" keyPressed={click} emitter={emitAction('right')} />
          <ControlInfoStyle>right</ControlInfoStyle>
        </KeySubWrapper>
        <KeySubWrapper>
          <Key type="down" keyPressed={click} emitter={emitAction('down')} />
          <ControlInfoStyle>down</ControlInfoStyle>
        </KeySubWrapper>
        <KeySubWrapper>
          <Key type="up" keyPressed={click} emitter={emitAction('up')} />
          <ControlInfoStyle>rotate</ControlInfoStyle>
        </KeySubWrapper>
        <KeySubWrapper>
          <Key type=" " keyPressed={click} emitter={emitAction(' ')} />
          <ControlInfoStyle>all the way down</ControlInfoStyle>
        </KeySubWrapper>
      </KeyWrapper>
    </ControllerWrapper>
  );
};

const mapStateToProps = (state: State) => ({
  socket: state.app.socket
});

export default connect(mapStateToProps)(GameController);
