import * as React from 'react';
import { connect } from 'react-redux';

import { State } from '../../../store';
import { GamePieces } from './GamePieces';
import { NextPiece } from './NextPiece';
import Options from './Options';
import { Result } from './Result';
import { Score } from './Score';
import StartButton from './StartButton';

interface Props {
  gameData: GameProps | null;
  socket: SocketIOClient.Socket;
}

export const Game: React.SFC<Props> = ({ gameData, socket }) => {
  let gamePieces, score, nextPiece, startButton, result, options;
  if (gameData) {
    score = gameData.score;
    nextPiece = gameData.nextPiece;

    const { stack, running, isOwner, isPlaying, winner } = gameData;
    gamePieces = stack.length ? <GamePieces stack={stack} /> : null;
    startButton = running || !isOwner ? null : <StartButton socket={socket} />;
    options = running || !isOwner ? null : <Options />;
    result = winner === undefined || isPlaying ? null : <Result winner={winner} />;
  } else {
    score = 0;
    nextPiece = null;
    gamePieces = null;
    startButton = null;
    result = null;
    options = null;
  }
  return (
    <React.Fragment>
      {gamePieces}
      <Score score={score} />
      <NextPiece nextPiece={nextPiece} />
      {startButton}
      {options}
      {result}
    </React.Fragment>
  );
};

const mapStateToProps = ({ app }: State) => ({
  gameData: app.gameData,
  socket: app.socket
});

export default connect(mapStateToProps)(Game);
