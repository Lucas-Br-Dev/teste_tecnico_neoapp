import { colors } from "@/data/colors";
import { Buttons } from "@/styles/Buttons";
import styled from "styled-components";

const Fixed = styled.div`
position: absolute;       /* absolute para ficar dentro do Modal */
  top: 0;
  left: 0;
  width: 100%;              /* ocupar todo o modal */
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;             /* z-index alto para ficar em cima */
  overflow: hidden;
  `

const AlertBox = styled.div`
  background-color: ${colors.pretoSuave};
  color: white;
  font-size: 22px;
  padding: 20px 30px;
  border-radius: 8px;
  min-width: 300px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
  border-radius: 5px;
`

type Props = {
  message: string;
  messageButton: string;
  isOpen: () => void;
  action?: () => void;
}

export const Alert = ({ message, messageButton, isOpen, action }: Props) => {
  return (

    <Fixed>
      <AlertBox>
        <div>{message}</div>
        <Buttons
          data-cy="button-alert"
          $bgcolor={colors.vermelhoPrincipal}
          $hovercolor={colors.vermelhoPrincipal2}
          onClick={() => {isOpen(); action && action()}}
        >
          {messageButton}
        </Buttons>
      </AlertBox>
    </Fixed>)
}