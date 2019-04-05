import * as React from 'react';
import { connect } from 'react-redux';

import { State } from '../../redux/store';

import { setScores } from '../../redux/actions';
import { ModalWrapper } from './styles';

interface Props {
  scores: BestScore[] | null;
  resetScores: () => void;
}

export const ScoreDisplay: React.SFC<Props> = ({ scores, resetScores }) => scores && (
  <ModalWrapper onClick={() => resetScores()}>
    {/* <ScoreWrapper>
    </ScoreWrapper> */}
  </ModalWrapper>
) || null;

const mapStateToProps = (state: State) => ({
  scores: state.app.scores
});

const mapDispatchToProps = (dispatch: any) => ({
  resetScores: () => dispatch(setScores(null))
});

export default connect(mapStateToProps, mapDispatchToProps)(ScoreDisplay);
