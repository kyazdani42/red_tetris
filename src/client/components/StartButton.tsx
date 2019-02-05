import * as React from 'react';

interface Props {
  dispatchStartGame: () => void;
}

export const StartButton: React.SFC<Props> = ({ dispatchStartGame }) => (
  <div style={{ backgroundColor: '#fff' }} onClick={dispatchStartGame}>
    start
  </div>
);
