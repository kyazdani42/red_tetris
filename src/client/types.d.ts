interface Player {
  id: string;
  username: string;
}

interface RoomType {
  id: string;
  players: Player[];
  activePlayers: Player[];
  owner: Player;
  running: boolean;
}

interface GameProps {
  name: string;
  running: boolean;
  isOwner: boolean;
  isPlaying: boolean;
  stack: Array<[{
    color: string;
    value: number;
    fix: boolean;
  }]>
}