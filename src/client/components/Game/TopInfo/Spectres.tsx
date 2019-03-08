import * as React from 'react';
import { connect } from 'react-redux';

import { State } from '../../../redux/store';
import { NameStyle, SpectreBlockStyle, SpectresContainer, SpectreStyle, SpectreWrapper } from './styles';
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
    <SpectreWrapper key={`spectre-nb-${i}`}>
      <SpectreStyle>
        {getSpectreArray(player.spectre).map((row, j) => row.map((col, k) => (
          <SpectreBlockStyle
            col={col}
            key={`spectre-block-${j}-${k}`}
          />
        )))}
      </SpectreStyle>
      <NameStyle>{player.name}</NameStyle>
    </SpectreWrapper>
  ));

const mapStateToProps = (state: State): Props => ({
  data: state.app.gameData
});

export default connect(mapStateToProps)(Spectres);
