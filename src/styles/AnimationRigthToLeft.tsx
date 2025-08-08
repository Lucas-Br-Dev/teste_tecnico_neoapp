import styled, { keyframes } from "styled-components";
const slideInFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;
export const AnimationRigthToLeft = styled.div`
  animation: ${slideInFromRight} 0.4s ease forwards;
`;
