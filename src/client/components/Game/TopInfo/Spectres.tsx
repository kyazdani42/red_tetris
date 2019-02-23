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
  const spectres = getSpectres(data.spectres);
  return <SpectresContainer>{spectres}</SpectresContainer>;
};

const getSpectres = (spectres: GameProps['spectres']) =>
  spectres.map((spectre, i) => (
    <SpectreStyle
      key={`spectre-nb-${i}`}
    >
      {getSpectreArray(spectre).map((row, j) => row.map((col, k) => (
        <SpectreBlockStyle
          col={col}
          key={`spectre-block-${j}-${k}`}
        />
      )))}
    </SpectreStyle>
  ));

const mapStateToProps = (state: State): Props => ({
  data: state.app.gameData
});

export default connect(mapStateToProps)(Spectres);
