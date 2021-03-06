import styled from 'styled-components';

export const LeaveButtonStyle = styled.div`
  position: absolute;
  right: 4%;
  height: 30px;
  width: 70px;
  line-height: 30px;
  text-align: center;
  background-color: ${props => props.theme.colors.primary.dark};
  border: 1px solid rgba(255,255,255,0.2);
  box-shadow: 0 3px 6px rgba(255,255,255,0.05), 0 3px 6px rgba(255,255,255,0.13);
  transition: box-shadow 300ms;
  user-select: none;
  cursor: pointer;
  &:hover {
    box-shadow: 0 3px 6px rgba(255,255,255,0.2), 0 3px 6px rgba(255,255,255,0.3);
  };
`;

export const SpectreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 90%;
  width: 5%;
  align-items: center;
  justify-content: flex-end;
`;

export const SpectreStyle = styled.div`
  border: 1px solid #fff;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 70%;
`;

export const NameStyle = styled.span`
  width: 100%;
  text-align: center;
  color: #fff;
`;

export const SpectreBlockStyle = styled.div`
  width: 10%;
  height: 5%;
  background-color: ${(props: { col: number | null }) => props.col ? 'red' : 'black'};
`;

export const SpectresContainer = styled.div`
  width: 80%;
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
