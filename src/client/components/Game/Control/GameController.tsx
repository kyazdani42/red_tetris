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

const GameController: React.SFC<Props> = ({ dispatchHandleKey, keyPressed }) => (
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
        <ControlInfoStyle>drop</ControlInfoStyle>
      </KeySubWrapper>
    </KeyWrapper>
  </ControllerWrapper>
);

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
