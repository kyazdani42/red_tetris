import * as React from 'react';
import { connect } from 'react-redux';

import { State } from '../../redux/store';

import { setScores } from '../../redux/actions';
import { ModalWrapper, ScoreRowStyle, ScoreRowWrapper, ScoresWrapper, ScoreTitle } from './styles';

interface Props {
  scores: BestScore[] | null;
  resetScores: () => void;
}

const handleClick = (resetScores: () => void) => (e: any) => {
  if (e.target.classList.contains('modal')) {
    resetScores();
  }
};

export const ScoreDisplay: React.SFC<Props> = ({ scores, resetScores }) => scores && (
  <ModalWrapper className="modal" onClick={handleClick(resetScores)}>
    <ScoresWrapper>
      <ScoreTitle>Top 25 Scores</ScoreTitle>
      <ScoreRowWrapper>
        <ScoreRowStyle>
          <span><b>Player</b></span>
          <span><b>Top Score</b></span>
          <span><b>Games Played</b></span>
          <span><b>Multiplayer Game Wins</b></span>
        </ScoreRowStyle>
        {getRows(scores)}
      </ScoreRowWrapper>
    </ScoresWrapper>
  </ModalWrapper>
) || null;

const getRows = (scores: BestScore[]) => scores.map(
  d => (
  <ScoreRowStyle>
    <span>{d.name}</span>
    <span>{d.bestScore}</span>
    <span>{d.gamesPlay}</span>
    <span>{d.multiPlayersWin}</span>
  </ScoreRowStyle>
  )
);

const mapStateToProps = (state: State) => ({
  scores: state.app.scores
});

const mapDispatchToProps = (dispatch: any) => ({
  resetScores: () => dispatch(setScores(null))
});

export default connect(mapStateToProps, mapDispatchToProps)(ScoreDisplay);
