import * as React from 'react';
import { RoomType } from '../../../../types';
import JoinButton from './JoinButton/Component';

export const RoomRow: React.SFC<RoomType> = ({ id, running, owner, players }) => {
  const numPlayers: string = String(players.length);
  const ownerName: string = owner.username;
  const roomName: string = `Room ${id}`;
  const join = running ? null : <JoinButton roomId={id} />;

  return (
    <div>
      <InfoBlock name="room" info={roomName} />
      <InfoBlock name="owner" info={ownerName} />
      <InfoBlock name="number players" info={numPlayers} />
      {join}
    </div>
  );
};

const InfoBlock: React.SFC<{ name: string; info: string }> = ({ name, info }) => (
  <div>
    <span>{name}</span>
    <span>{info}</span>
  </div>
);
