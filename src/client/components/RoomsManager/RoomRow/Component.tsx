import * as React from 'react';
import styled from 'styled-components';

import { RoomType } from '../../../types';
import { InfoBlock } from './InfoBlock/Component';
import JoinButton from './JoinButton/Component';

const StyledRow = styled.div`
  height: 80px;
  background-color: #eee;
  border: 1px solid rgba(0,0,0,.1);
  border-radius: 4px;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const RoomRow: React.SFC<RoomType> = ({ id, running, owner, players }) => {
  const numPlayers: string = String(players.length);
  const ownerName: string = owner.username;
  const roomName: string = `Room ${id}`;
  const join = running ? null : <JoinButton roomId={id} />;

  return (
    <StyledRow>
      <InfoBlock name="room" info={roomName} />
      <InfoBlock name="owner" info={ownerName} />
      <InfoBlock name="number players" info={numPlayers} />
      {join}
    </StyledRow>
  );
};
