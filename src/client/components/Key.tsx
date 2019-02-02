import * as React from 'react';
import { connect } from 'react-redux';

import { State } from '../store';

interface Props {
  dispatcher: () => void;
  keyPressed: State['app']['key'];
  type: State['app']['key'];
}

const Key = ({ dispatcher, keyPressed, type }: Props) => (
  <div
    onClick={dispatcher}
    style={{
      width: '50px',
      height: '50px',
      color: '#000',
      backgroundColor: keyPressed === type ? 'orange' : '#fff'
    }}
  >
  {type === ' ' ? 'space' : type}
  </div>
);

const mapStateToProps = (
  state: State,
  { dispatcher, type }: { dispatcher: () => void; type: State['app']['key'] }
) => ({
  keyPressed: state.app.key,
  type,
  dispatcher
});

export default connect(mapStateToProps)(Key);
