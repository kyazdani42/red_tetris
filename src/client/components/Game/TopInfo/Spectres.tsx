import * as React from 'react';
import { connect } from 'react-redux';

import { State } from '../../../redux/store';
import {
  NameStyle,
  SpectreBlockStyle,
  SpectresContainer,
  SpectreStyle,
  SpectreWrapper
} from './styles';

interface Props {
  data: GameProps | null;
}

export const Spectres: React.SFC<Props> = ({ data }) => {
  if (!data) return null;
  const spectres = getSpectres(data.otherPlayers);
  return <SpectresContainer>{spectres}</SpectresContainer>;
};

const getSpectres = (otherPlayers: GameProps['otherPlayers'] = []) =>
  otherPlayers.map((player, i) => (
    <SpectreWrapper key={`spectre-nb-${i}`}>
      <SpectreStyle>{getSpectreBlocks(player)}</SpectreStyle>
      <NameStyle>{player.name}</NameStyle>
    </SpectreWrapper>
  ));

const getSpectreBlocks = (player: any) =>
  getSpectreArray(player.spectre).map((row, j) =>
    row.map((col, k) => <SpectreBlockStyle col={col} key={`spectre-block-${j}-${k}`} />)
  );

const getSpectreArray = (spectre: number[]) =>
  [...Array(20)].map((_, row) =>
    [...Array(10)].map((__, col) => (spectre[col] !== null && spectre[col] <= row ? 1 : null))
  );

export const mapStateToProps = (state: State): Props => ({
  data: state.app.gameData
});

export default connect(mapStateToProps)(Spectres);
