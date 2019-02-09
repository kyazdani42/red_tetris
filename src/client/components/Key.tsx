import * as React from 'react';
import styled from 'styled-components';

import '../../../assets/icon-down.png';
import '../../../assets/icon-left.png';
import '../../../assets/icon-right.png';
import '../../../assets/icon-space.png';
import '../../../assets/icon-up.png';

interface Props {
  emitter: () => void;
  type: keyType;
  keyPressed: keyType | null;
}

const KeyStyle: any = styled.div`
  width: 10%;
  height: 10%;
  color: #000;
  background-color: ${(props: any) => props.isPressed ? '#555' : '#fff'};
`;

const Key = ({ keyPressed, emitter, type }: Props) => (
  <KeyStyle
    onClick={emitter}
    isPressed={keyPressed === type}
  >
    <img src={`/assets/icon-${type === ' ' ? 'space' : type}.png`} />
  </KeyStyle>
);

export default Key;
