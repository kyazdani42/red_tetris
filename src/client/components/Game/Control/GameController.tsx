import * as React from 'react';
import { connect } from 'react-redux';

import Key from './Key';

import { handleKeyPress } from '../../../actions/actions';
import { State } from '../../../store';
import { ControlInfoStyle, ControllerWrapper, KeySubWrapper, KeyWrapper } from './styles';
import { setWindowEvents } from './utils';

interface Props {
  keyPressed: keyType | null;
  dispatchHandleKey: (key: keyType) => void;
}

const GameController: React.SFC<Props> = ({ dispatchHandleKey, keyPressed }) => {
  React.useEffect(() => {
    const listener = setWindowEvents(dispatchHandleKey);
    return () => window.removeEventListener('keydown', listener);
  }, []);
  return (
    <ControllerWrapper>
      <KeyWrapper>
        <KeySubWrapper>
          <Key type="left" keyPressed={keyPressed} emitter={() => dispatchHandleKey('left')} />
          <ControlInfoStyle>left</ControlInfoStyle>
        </KeySubWrapper>
        <KeySubWrapper>
          <Key type="right" keyPressed={keyPressed} emitter={() => dispatchHandleKey('right')} />
          <ControlInfoStyle>right</ControlInfoStyle>
        </KeySubWrapper>
        <KeySubWrapper>
          <Key type="down" keyPressed={keyPressed} emitter={() => dispatchHandleKey('down')} />
          <ControlInfoStyle>down</ControlInfoStyle>
        </KeySubWrapper>
        <KeySubWrapper>
          <Key type="up" keyPressed={keyPressed} emitter={() => dispatchHandleKey('up')} />
          <ControlInfoStyle>rotate</ControlInfoStyle>
        </KeySubWrapper>
        <KeySubWrapper>
          <Key type=" " keyPressed={keyPressed} emitter={() => dispatchHandleKey(' ')} />
          <ControlInfoStyle>all the way down</ControlInfoStyle>
        </KeySubWrapper>
      </KeyWrapper>
    </ControllerWrapper>
  );
};

const mapStateToProps = (state: State) => ({
  keyPressed: state.app.key
});

const mapDispatchToProps = (dispatch: any) => ({
  dispatchHandleKey: (key: keyType) => dispatch(handleKeyPress(key))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameController);