import styled from 'styled-components';

import { getColor } from './utils';

export const StartButtonStyle = styled.h3`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -40px;
  margin-left: -50px;
  text-align: center;
  color: #fff;
  background-color: #000;
  border: 1px solid #fff;
  height: 40px;
  line-height: 40px;
  width: 100px;
  cursor: pointer;
  :hover {
    border: 1px solid red;
    text-shadow: 1px 1px 1px red;
  }
`;

export const ScoreStyle = styled.div`
  position: absolute;
  top: -1px;
  left: -102px;
  color: #fff;
  background-color: #000;
  border: 1px solid #fff;
  height: 40px;
  width: 100px;
`;

export const ResultWrapper: any = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.1);
  user-select: none;
  pointer-events: none;
`;

export const ResultStyle: any = styled.h1`
  color: ${(props: any) => (props.winner ? '#0bff40' : '#7a00ff')};
  font-size: 5vw;
  margin: auto;
  width: 500px;
  text-align: center;
  height: 50px;
  margin-top: 5%;
`;

export const PieceContainer = styled.div`
  position: absolute;
  top: 41px;
  left: -173px;
  height: 170px;
  width: 170px;
  border: 1px solid #fff;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #000;
`;

export const GamePiecesContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
`;

export const BlockStyle = styled.div`
  width: calc(10% - 2px);
  border: solid 1px black;
  height: calc(5% - 2px);
  background-color: ${props => getColor(props.color as colorType)};
`;

export const NextBlockStyle: any = styled.div`
  width: calc(25% - 2px);
  border: solid 1px black;
  height: calc(25% - 2px);
  background-color: ${props => getColor(props.color as colorType)};
`;
