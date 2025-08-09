import { LoadedIcon } from "@/ui/LoadedIcon";
import styled, { keyframes } from "styled-components"

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Loading = styled.div`
  width: 100px;
  height: 100px;
  animation: ${rotate} 2s ease-in-out infinite;
`;

const AreaLoadind = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Loaded = () => {
  return (
    <AreaLoadind>
      <Loading>{LoadedIcon}</Loading>
    </AreaLoadind>
  )
}