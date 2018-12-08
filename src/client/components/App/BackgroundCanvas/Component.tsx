import * as React from 'react';
import styled from 'styled-components';

const BackgroundContainer = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #000;
`;

export const BackgroundCanvas = () => <BackgroundContainer id="bg-anim" />;
