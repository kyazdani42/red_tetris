interface RoomType {
  name: string;
  players: number;
  ownerName: string;
  running: boolean;
}

interface GameProps {
  name: string;
  running: boolean;
  isOwner: boolean;
  winner: boolean;
  isPlaying: boolean;
  score: number;
  stack: Array<[{
    color: string;
    value: number;
    fix: boolean;
  }]>;
  nextPiece: {
    color: string;
    patterns: number[][][];
  };
  otherPlayers: Array<{
    name: string;
    spectre: number[];
  }>;
}

interface Options {
  invisible: boolean;
  reverse: boolean;
  mirror: boolean;
  speed: boolean;
}

type keyType = 'up' | 'down' | 'left' | 'right' | ' ';

interface PlayerType {
  playerName: string;
  token: string | null;
}
