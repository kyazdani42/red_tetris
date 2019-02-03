export interface Player {
  id: string;
  username: string;
}

export interface RoomType {
  id: string;
  players: Player[];
  activePlayers: Player[];
  owner: Player;
  running: boolean;
}

export interface GameProps {
  name: string;
  running: boolean;
  isOwner: boolean;
}