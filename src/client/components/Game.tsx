import * as React from 'react';
import { connect } from 'react-redux';

import { State } from '../store';
import { GamePieces } from './GamePieces';
import { NextPiece } from './NextPiece';
import { Score } from './Score';

interface Props {
  gameData: GameProps | null;
}

export const Game: React.SFC<Props> = ({ gameData }) => {
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
    </React.Fragment>
  );
};
const mapStateToProps = ({ app }: State) => ({
  gameData: app.gameData
});

export default connect(mapStateToProps)(Game);
