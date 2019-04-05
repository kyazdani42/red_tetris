import * as React from 'react';
import { connect } from 'react-redux';

import { getScores } from '../../redux/actions';
import { ScoreButtonStyle } from './styles';

interface Props {
  dispatchGetScores: () => void;
}

export const ScoreButton: React.SFC<Props> = ({ dispatchGetScores }) => (
  <ScoreButtonStyle onClick={() => dispatchGetScores()} />
);

const mapDispatchToProps = (dispatch: any) => ({
  dispatchGetScores: () => dispatch(getScores())
});

export default connect(undefined, mapDispatchToProps)(ScoreButton);
