import * as React from 'react';
import { connect } from 'react-redux';

import Key from './Key';

import { handleKeyPress } from '../../../redux/actions';
import { State } from '../../../redux/store';
import { ControlInfoStyle, ControllerWrapper, KeySubWrapper, KeyWrapper } from './styles';

interface Props {
  keyPressed: keyType | null;
  dispatchHandleKey: (key: keyType) => void;
}

export const GameController: React.SFC<Props> = ({ dispatchHandleKey, keyPressed }) => {
  const emit = getEmitter(dispatchHandleKey);
  return (
    <ControllerWrapper>
      <KeyWrapper>
        <KeySubWrapper>
          <Key type="left" keyPressed={keyPressed} emitter={emit('left')} />
          <ControlInfoStyle>left</ControlInfoStyle>
        </KeySubWrapper>
        <KeySubWrapper>
          <Key type="right" keyPressed={keyPressed} emitter={emit('right')} />
          <ControlInfoStyle>right</ControlInfoStyle>
        </KeySubWrapper>
        <KeySubWrapper>
          <Key type="down" keyPressed={keyPressed} emitter={emit('down')} />
          <ControlInfoStyle>down</ControlInfoStyle>
        </KeySubWrapper>
        <KeySubWrapper>
          <Key type="up" keyPressed={keyPressed} emitter={emit('up')} />
          <ControlInfoStyle>rotate</ControlInfoStyle>
        </KeySubWrapper>
        <KeySubWrapper>
          <Key type=" " keyPressed={keyPressed} emitter={emit(' ')} />
          <ControlInfoStyle>drop</ControlInfoStyle>
        </KeySubWrapper>
      </KeyWrapper>
    </ControllerWrapper>
  );
};

export const getEmitter = (dispatchHandleKey: (key: keyType) => void) => (key: keyType) => () => dispatchHandleKey(key);

export const mapStateToProps = (state: State) => ({
  keyPressed: state.app.key
});

export const mapDispatchToProps = (dispatch: any) => ({
  dispatchHandleKey: (key: keyType) => dispatch(handleKeyPress(key))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameController);
