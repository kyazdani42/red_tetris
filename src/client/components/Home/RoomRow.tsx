import * as React from 'react';
import styled from 'styled-components';

import JoinButton from './JoinButton';

const StyledRow = styled.div`
  height: 50px;
  box-sizing: border-box;
  background-color: #000;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  color: #fff;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  border-bottom: 1px solid rgba(255,255,255,0.1);
`;

export const RoomRow: React.SFC<RoomType> = (props: any) => {
  const { running, name, players } = props;
  console.log(props);
  // const ownerName: string = `owner: ${owner.slice(0, 2)}`;
  const join = running ? null : <JoinButton roomId={name} />;

  return (
    <StyledRow>
      <h3 style={{ margin: 0 }}>
        <span>{'whatever'}</span>
      </h3>
      <div>
        <span>{players} player{players > 1 ? 's' : ''} </span>
      </div>
      {join}
    </StyledRow>
  );
};
