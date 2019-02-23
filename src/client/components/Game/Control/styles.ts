import styled from 'styled-components';

export const KeyStyle: any = styled.div`
  width: 40px;
  height: 40px;
  color: #000;
`;

export const KeyImg: any = styled.img`
  background-color: ${(props: any) => props.isPressed ? '#555' : '#fff'};
  filter: invert(1);
  width: 40px;
`;

export const ControllerWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  justify-content: center;
`;

export const KeyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BottomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
