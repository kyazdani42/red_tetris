import * as React from 'react';
import { connect } from 'react-redux';

import { State } from '../store';
import { GamePieces } from './GamePieces';
import { NextPiece } from './NextPiece';
import { Score } from './Score';
import { StartButton } from './StartButton';

interface Props {
  gameData: GameProps | null;
  socket: SocketIOClient.Socket;
}

export const Game: React.SFC<Props> = ({ gameData, socket }) => {
  let gamePieces, score, nextPiece;
  if (gameData) {
    gamePieces = <GamePieces stack={gameData.stack} />;
    score = gameData.score;
    nextPiece = gameData.nextPiece;
  } else {
    gamePieces = null;
    score = 0;
    nextPiece = null;
  }
  return (
    <React.Fragment>
      {gamePieces}
      <Score score={score} />
      <NextPiece nextPiece={nextPiece} />
      <StartButton socket={socket} />
    </React.Fragment>
  );
};
const mapStateToProps = ({ app }: State) => ({
  gameData: app.gameData,
  socket: app.socket
});

export default connect(mapStateToProps)(Game);
