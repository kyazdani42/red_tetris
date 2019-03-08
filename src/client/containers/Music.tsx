import * as React from 'react';
import { MusicStyle } from './styles';

export const Music = () => (
  <React.Fragment>
    <MusicStyle
      onClick={() => {
        const audio: any = document.getElementById('tetris-music');
        if (audio.isPlaying === undefined) audio.isPlaying = true;
        if (audio && audio.isPlaying) {
          audio.pause();
          audio.isPlaying = false;
        } else {
          audio.play();
          audio.isPlaying = true;
        }
      }}
    >
    </MusicStyle>
    <audio id="tetris-music" loop autoPlay>
       <source src="/assets/theme-tetris.mp3">
       </source>
    </audio>
  </React.Fragment>
);
