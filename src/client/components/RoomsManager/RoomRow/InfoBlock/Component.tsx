import * as React from 'react';

export const InfoBlock: React.SFC<{ name: string; info: string }> = ({ name, info }) => (
  <div style={{ textAlign: 'center'}}>
    <span>{name}</span><br />
    <span>{info}</span>
  </div>
);
