import * as React from 'react';

interface Props {
  emitter: () => void;
  type: keyType;
  keyPressed: keyType | null;
}

const Key = ({ keyPressed, emitter, type }: Props) => (
  <div
    onClick={emitter}
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

export default Key;
