import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body, html, #root {
    padding: 0;
    margin: 0;
  }
  @font-face {
    font-family: 'Circular Book';
    font-style: normal;
    font-weight: normal;
    src: local('assets/Circular Book');
  }
  @font-face {
    font-family: 'Circular Book Italic';
    font-style: normal;
    font-weight: normal;
    src: local('assets/Circular Book Italic');
  }
  @font-face {
    font-family: 'Circular Bold';
    font-style: normal;
    font-weight: normal;
    src: local('assets/Circular Bold');
  }
`;

export const BackgroundStyle = styled.div`
  background-color: #000;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const TopInfoContainer = styled.div`
  height: 10%;
  width: 100%;
  border-bottom: 1px solid #fff;
  box-shadow: 0 10px 10px rgba(255,44,55,0.10), 0 5px 5px rgba(255,55,55,0.20);
  background-color: black;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const GameWrapper = styled.div`
  position: relative;
  z-index: 11;
  width: 35vmin;
  height: 70vmin;
  min-width: 200px;
  min-height: 400px;
  border: 1px solid #fff;
  box-shadow: 0 10px 10px rgba(255, 44, 55, 0.1), 0 5px 5px rgba(255, 55, 55, 0.2);
  background-color: #000;
`;

export const ControlContainer = styled.div`
  height: 7%;
  width: 30%;
  margin-bottom: 20px;
  min-width: 200px;
  max-width: 400px;
  box-shadow: 0 10px 10px rgba(255,44,55,0.10), 0 5px 5px rgba(255,55,55,0.20);
  background-color: #000;
  border: 1px solid #fff;
`;

export const RoomWrapper = styled.div`
  font-family: ${props => props.theme.fonts.text};
  font-size: 18px;
  font-weight: 300;
  background-color: #000;
  color: #000;
  z-index: 100;
  height: 80vh;
  width: 70vw;
  margin: 10vh auto auto;
  max-width: 500px;
  border: 1px solid rgba(255,69,100,0.4);
  box-shadow: 0 10px 10px rgba(255,44,55,0.20), 0 5px 5px rgba(255,55,55,0.20);
  transition: all 1s;
  align-self: flex-end;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

export const RowWrapperHideOverflow = styled.div`
  height: 88%;
  width: 90%;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const RowWrapper = styled.div`
  height: 100%;
  width: 100%;
  padding-right: 17px;
  overflow-y: scroll;
`;

export const MusicStyle = styled.button`
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 0px;
  position: fixed;
  background-color: #000;
  border: 1px solid rgba(255,255,255,0.5);
  box-shadow: 0 10px 20px rgba(255,44,55,0.30);
  top: 20px;
  left: 20px;
`;

export const BackgroundImage = styled.div`
  background-image: url('assets/bg.jpg');
  filter: brightness(0.6) sepia(80%) grayscale(70%) saturate(80%);
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const ImgStyle = styled.img`
  width: 20px;
  height: 20px;
  position: fixed;
  top: 25px;
  left: 25px;
  filter: invert(1);
`;
