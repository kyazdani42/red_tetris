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
        onClick={handleAudio(document, isPlaying, dispatchSetIsPlaying)}
      >
        <ImgStyle className="audio-icon" src={isPlaying ? '/assets/iconpause.png' : '/assets/iconplay.png'} />
      </MusicStyle>
      <audio id="tetris-music" loop autoPlay>
        <source src="/assets/theme-tetris.mp3">
        </source>
      </audio>
    </React.Fragment>
  );
};

export const handleAudio = (document: any, isPlaying: boolean, dispatchSetIsPlaying: () => void) => () => {
  const audio: any = document.getElementById('tetris-music');
  if (audio && isPlaying) {
    audio.pause();
    dispatchSetIsPlaying();
  } else if (audio) {
    audio.play();
    dispatchSetIsPlaying();
  }
};

export const mapStateToProps = (state: State) => ({
  isPlaying: state.app.musicPlaying
});

export const mapDispatchToProps = (dispatch: any) => ({
  dispatchSetIsPlaying: () => dispatch(setMusicPlaying())
});

export default connect(mapStateToProps, mapDispatchToProps)(Music);
