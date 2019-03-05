import * as React from 'react';

import { KeyImg, KeyStyle } from './styles';

interface Props {
  emitter: () => void;
  type: keyType;
  keyPressed: keyType | null;
}

const Key = ({ keyPressed, emitter, type }: Props) => (
  <KeyStyle
    onClick={emitter}
  >
    <KeyImg src={`/assets/icon${type === ' ' ? 'space' : type}.png`} isPressed={keyPressed === type} />
  </KeyStyle>
);

export default Key;
