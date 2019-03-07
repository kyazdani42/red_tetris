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
  top: -21px;
  left: 50%;
  margin-left: -25%;
  color: #fff;
  background-color: #000;
  border: 1px solid #fff;
  border-bottom: none;
  height: 19px;
  text-align: center;
  width: 50%;
`;

export const PieceContainer = styled.div`
  z-index: 10;
  position: absolute;
  bottom: -1px;
  left: calc(-17vmin - 3px);
  height: 17vmin;
  width: 17vmin;
  border: 1px solid #fff;
  border-right: none;
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

export const OptionsWrapper = styled.div`
  display: flex;
  background-color: rgba(0,0,0,0.5);
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 130px;
  width: 140px;
  position: absolute;
  top: 63%;
  left: 50%;
  margin-left: -70px;
  margin-top: -50px;
`;

export const OptionLabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

export const ResultStyle: any = styled.h1`
  position: absolute;
  top: 40%;
  margin-top: -50px;
  left: 50%;
  margin-left: -200px;
  color: ${(props: any) => (props.winner ? '#0bff40' : '#7a00ff')};
  font-size: 5vmin;
  width: 400px;
  height: 50px;
  text-align: center;
`;

export const GameStartInfoWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.75);
`;
