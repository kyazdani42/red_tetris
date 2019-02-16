import * as React from 'react';
import styled from 'styled-components';

interface Props {
  emitter: () => void;
  type: keyType;
  keyPressed: keyType | null;
}

const KeyStyle: any = styled.div`
  width: 40px;
  height: 40px;
  color: #000;
`;

const Img: any = styled.img`
  background-color: ${(props: any) => props.isPressed ? '#555' : '#fff'};
  filter: invert(1);
  width: 40px;
`;

const Key = ({ keyPressed, emitter, type }: Props) => (
  <KeyStyle
    onClick={emitter}
  >
    <Img src={`/assets/icon${type === ' ' ? 'space' : type}.png`} isPressed={keyPressed === type} />
  </KeyStyle>
);

export default Key;
