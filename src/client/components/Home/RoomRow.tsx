import * as React from 'react';

import JoinButton from './JoinButton';
import { StyledRow } from './styles';

export const RoomRow: React.SFC<RoomType> = (props: any) => {
  const { running, name, players, ownerName } = props;
  const join = running ? null : <JoinButton roomId={name} />;

  return (
    <StyledRow>
      <h3 style={{ margin: 0 }}>
        <span>owner: {ownerName}</span>
      </h3>
      <div>
        <span>{players} player{players > 1 ? 's' : ''} </span>
      </div>
      {join}
    </StyledRow>
  );
};
