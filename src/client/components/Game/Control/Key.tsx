import * as React from 'react';

import { KeyImg, KeyStyle } from './styles';

interface Props {
  emitter: () => void;
  type: keyType;
  keyPressed: keyType | null;
}

const Key: React.SFC<Props> = ({ keyPressed, emitter, type }) => (
  <KeyStyle onClick={emitter}>
    <KeyImg
      className="key-img"
      src={`/assets/icon${type === ' ' ? 'space' : type}.png`}
      isPressed={keyPressed === type}
    />
  </KeyStyle>
);

export default Key;
