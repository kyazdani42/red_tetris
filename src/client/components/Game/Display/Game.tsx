import * as React from 'react';
import { connect } from 'react-redux';

import { State } from '../../../store';
import { GamePieces } from './GamePieces';
import { NextPiece } from './NextPiece';
import { Result } from './Result';
import { Score } from './Score';
import { StartButton } from './StartButton';

interface Props {
  gameData: GameProps | null;
  socket: SocketIOClient.Socket;
}

export const Game: React.SFC<Props> = ({ gameData, socket }) => {
  let gamePieces, score, nextPiece, startButton, result;
  if (gameData) {
    gamePieces = <GamePieces stack={gameData.stack} />;
    score = gameData.score;
    nextPiece = gameData.nextPiece;
    startButton = gameData.running ? null : <StartButton socket={socket} />;
    result = gameData.isPlaying ? null : <Result winner={gameData.winner} />;
  } else {
    gamePieces = null;
    score = 0;
    nextPiece = null;
    startButton = <StartButton socket={socket} />;
    result = null;
  }
  return (
    <React.Fragment>
      {gamePieces}
      <Score score={score} />
      <NextPiece nextPiece={nextPiece} />
      {startButton}
      {result}
    </React.Fragment>
  );
};

const mapStateToProps = ({ app }: State) => ({
  gameData: app.gameData,
  socket: app.socket
});

export default connect(mapStateToProps)(Game);
