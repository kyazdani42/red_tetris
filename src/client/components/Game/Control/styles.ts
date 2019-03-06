import styled from 'styled-components';

export const KeyStyle: any = styled.div`
  color: #000;
`;

export const KeyImg: any = styled.img`
  background-color: ${(props: any) => props.isPressed ? '#555' : '#fff'};
  filter: invert(1);
  width: 3vmax;
  max-width: 30px;
`;

export const ControllerWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

export const KeyWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const KeySubWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ControlInfoStyle = styled.span`
  color: #fff;
`;
