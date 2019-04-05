import * as React from 'react';
import { connect } from 'react-redux';

import { State } from '../../redux/store';
import { PlayerScoreDisplay, PlayerScoreWrapper } from './styles';

interface Props {
  playerScore: BestScore | null;
}

export const PlayerScore: React.SFC<Props> = ({ playerScore }) =>
  (playerScore && (
    <PlayerScoreWrapper>
      <PlayerScoreDisplay>Hello {playerScore.name}</PlayerScoreDisplay>
      <PlayerScoreDisplay>Your best Score: {playerScore.bestScore}</PlayerScoreDisplay>
      <PlayerScoreDisplay>
        You played {playerScore.gamesPlay} games and won {playerScore.multiPlayersWin} times
      </PlayerScoreDisplay>
    </PlayerScoreWrapper>
  )) ||
  null;

export const mapStateToProps = (state: State) => ({
  playerScore: state.app.playerScore
});

export default connect(mapStateToProps)(PlayerScore);
