import styled from 'styled-components';

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100%;
  z-index: 1000;
  background-color: rgba(0,0,0,0.7);
`;

export const ModalStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 130px;
  margin: auto;
  margin-top: 40vh;
  background-color: #000;
  border-radius: 5px;
  border: 1px solid rgba(255,255,255,0.2);
`;

export const CreateRoomStyle = styled.div`
  font-family: ${props => props.theme.fonts.title};
  background-color: ${props => props.theme.colors.primary.normal};
  font-weight: bold;
  border-radius: 24px;
  color: #fff;
  line-height: 40px;
  height: 40px;
  width: 120px;
  font-size: 14px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  text-align: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.3);
  user-select: none;
  cursor: pointer;
  :hover {
    opacity: 0.94;
  }
`;

export const InputWrapper = styled.div`
  width: 250px;
  height: 65px;
`;

export const LabelStyle = styled.label`
  font-family: ${props => props.theme.fonts.title};
  width: 50px;
  margin: auto;
  font-size: 14px;
  color: #fff;
`;

export const NameInputStyle = styled.input`
  margin: auto;
  padding: 5px 10px 5px 10px;
  box-sizing: border-box;
  border: 1px solid #eee;
  border-radius: 4px;
  width: 250px;
  height: 30px;
`;

export const ErrorStyle = styled.span`
  color: red;
  font-size: 14px;
`;

export const NewGameButton = styled.div`
  font-family: ${props => props.theme.fonts.title};
  background-color: ${props => props.theme.colors.primary.dark};
  border-radius: 4px;
  color: #fff;
  width: 35%;
  padding: 4px;
  font-size: 22px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  text-align: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.3);
  user-select: none;
  cursor: pointer;
  :hover {
    opacity: 0.94;
  }
  @media screen and (max-width: 500px) {
    font-size: 15px;
  }
`;

export const JoinButtonStyle = styled.div`
  height: 30px;
  width: 80px;
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

export const StyledRow = styled.div`
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
