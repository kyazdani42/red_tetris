import * as React from 'react';
import { connect } from 'react-redux';

import { State } from '../redux/store';

import { setMusicPlaying } from '../redux/actions';
import { ImgStyle, MusicStyle } from './styles';

interface Props {
  isPlaying: boolean;
  dispatchSetIsPlaying: () => void;
}

export const Music: React.SFC<Props> = ({ isPlaying, dispatchSetIsPlaying }) => {
  return (
    <React.Fragment>
      <MusicStyle
        onClick={() => {
          const audio: any = document.getElementById('tetris-music');
          if (audio && isPlaying) {
            audio.pause();
            dispatchSetIsPlaying();
          } else if (audio) {
            audio.play();
            dispatchSetIsPlaying();
          }
        }}
      >
        <ImgStyle src={isPlaying ? '/assets/iconpause.png' : '/assets/iconplay.png'} />
      </MusicStyle>
      <audio id="tetris-music" loop autoPlay>
        <source src="/assets/theme-tetris.mp3">
        </source>
      </audio>
    </React.Fragment>
  );
};

const mapStateToProps = (state: State) => ({
  isPlaying: state.app.musicPlaying
});

const mapDispatchToProps = (dispatch: any) => ({
  dispatchSetIsPlaying: () => dispatch(setMusicPlaying())
});

export default connect(mapStateToProps, mapDispatchToProps)(Music);
