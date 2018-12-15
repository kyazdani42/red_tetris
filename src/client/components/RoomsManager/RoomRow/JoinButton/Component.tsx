import * as React from 'react';
import { connect } from 'react-redux';
import styled, { withTheme } from 'styled-components';

import { handleJoinRoom } from '../../../../actions/room';

interface Props {
  joinRoom: (id: string) => void;
  roomId: string;
}

const Button = styled.div`
  height: 30px;
  width: 80px;
  background-color: ${props => props.theme.colors.primary.light};
  border: 1px solid rgba(0,0,0,0.2);
  font-size: 17px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.05), 0 3px 6px rgba(0,0,0,0.13);
  padding-top: 1px;
  padding-left: 5px;
  margin-left: 3px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  align-content: center;
  transition: box-shadow 300ms;
  user-select: none;
  cursor: pointer;
  &:hover {
    box-shadow: 0 3px 6px rgba(0,0,0,0.2), 0 3px 6px rgba(0,0,0,0.3);
  };
`;

export const JoinButton: React.SFC<Props> = ({ joinRoom, roomId }) => (
  <Button onClick={handleClick(joinRoom, roomId)}><span>Join</span><Svg /></Button>
);

const handleClick = (joinRoom: (id: string) => void, roomId: string) => (e: any) => {
  const target = e.currentTarget;
  target.style.opacity = '0.9';
  setTimeout(() => { target.style.opacity = '1'; }, 100);
  joinRoom(roomId);
};

const Svg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z" />
    <path fill="none" d="M0 0h24v24H0z" />
  </svg>
);

const mapStateToProps = (_: any, { roomId }: { roomId: string }) => ({
  roomId
});

const mapDispatchToProps = (dispatch: any) => ({
  joinRoom: (id: string) => dispatch(handleJoinRoom(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(JoinButton as any));
