import * as React from 'react';
import { connect } from 'react-redux';

import { State } from '../../../store';
import { SpectreBlockStyle, SpectresContainer, SpectreStyle } from './styles';
import { getSpectreArray } from './utils';

interface Props {
  data: GameProps | null;
}

const Spectres: React.SFC<Props> = ({ data }) => {
  if (!data) return null;
  const spectres = getSpectres(data.otherPlayers);
  return <SpectresContainer>{spectres}</SpectresContainer>;
};

const getSpectres = (otherPlayers: GameProps['otherPlayers'] = []) =>
  otherPlayers.map((player, i) => (
    <React.Fragment>
      <SpectreStyle
        key={`spectre-nb-${i}`}
      >
        {getSpectreArray(player.spectre).map((row, j) => row.map((col, k) => (
          <SpectreBlockStyle
            col={col}
            key={`spectre-block-${j}-${k}`}
          />
        )))}
      </SpectreStyle>
      <span>{player.name}</span>
    </React.Fragment>
  ));

const mapStateToProps = (state: State): Props => ({
  data: state.app.gameData
});

export default connect(mapStateToProps)(Spectres);
