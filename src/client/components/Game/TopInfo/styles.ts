import styled from 'styled-components';

export const LeaveButtonStyle = styled.div`
  height: 50px;
  width: 50px;
  background-color: ${props => props.theme.colors.primary.dark};
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

export const SpectreStyle = styled.div`
  border: 1px solid #fff;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 50px;
  height: 100px;
`;

export const SpectreBlockStyle = styled.div`
  width: 5px;
  height: 5px;
  background-color: ${(props: { col: number | null }) => props.col ? 'red' : 'black'};
`;
