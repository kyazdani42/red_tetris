import * as React from 'react';
import { connect } from 'react-redux';

import Key from './Key';

import { keyDown, keyLeft, keyRight, keySpace, keyUp } from '../actions/actions';

interface Props {
  dispatchKeySpace: () => void;
  dispatchKeyUp: () => void;
  dispatchKeyDown: () => void;
  dispatchKeyLeft: () => void;
  dispatchKeyRight: () => void;
}

const handleKeyPress = (props: Props) => (e: any) => {
  switch (e.key) {
    case ' ':
      props.dispatchKeySpace();
      break;
    case 'ArrowUp':
      props.dispatchKeyUp();
      break;
    case 'ArrowDown':
      props.dispatchKeyDown();
      break;
    case 'ArrowLeft':
      props.dispatchKeyLeft();
      break;
    case 'ArrowRight':
      props.dispatchKeyRight();
      break;
  }
};

const setWindowEvents = (props: Props) => {
  const listener = handleKeyPress(props);
  window.removeEventListener('keydown', listener);
  window.addEventListener('keydown', listener);
};

const GameController = (props: Props) => {
  setWindowEvents(props);
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Key type="left" dispatcher={props.dispatchKeyLeft} />
      <Key type="right" dispatcher={props.dispatchKeyRight} />
      <Key type="down" dispatcher={props.dispatchKeyDown} />
      <Key type="up" dispatcher={props.dispatchKeyUp} />
      <Key type=" " dispatcher={props.dispatchKeySpace} />
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  dispatchKeySpace: () => dispatch(keySpace()),
  dispatchKeyUp: () => dispatch(keyUp()),
  dispatchKeyDown: () => dispatch(keyDown()),
  dispatchKeyLeft: () => dispatch(keyLeft()),
  dispatchKeyRight: () => dispatch(keyRight()),
});

export default connect(undefined, mapDispatchToProps)(GameController);
