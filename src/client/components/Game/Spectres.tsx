import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';

interface Props {
  data: GameProps | null;
}

const getArray = (spectre: number[]) =>
  [...Array(20)].map((_, row) =>
    [...Array(10)].map((__, col) => (spectre[col] !== null && spectre[col] <= row ? 1 : null))
  );

const Spectres: React.SFC<Props> = ({ data }) => {
  if (!data) return null;
  const spectres = getSpectres(data.spectres);
  return <div>{spectres}</div>;
};

const getSpectres = (spectres: GameProps['spectres']) =>
  spectres.map(spectre => (
    <div
      style={{
        border: '1px solid white',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '50px',
        height: '100px'
      }}
      key={Math.random() + ''}
    >
      {getArray(spectre).map(row => row.map(col => (
        <div
          style={{ width: '5px', height: '5px', backgroundColor: col ? 'red' : 'black' }}
          key={Math.random() + '' + Math.random()}
        />
      )))}
    </div>
  ));

const mapStateToProps = (state: State): Props => ({
  data: state.app.gameData
});

export default connect(mapStateToProps)(Spectres);
