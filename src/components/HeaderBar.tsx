import { colors } from "@/data/colors";
import { CartIcon } from "@/ui/CartIcon";
import styled from "styled-components";

const HeaderStyled = styled.header`
background-color: ${colors.vermelhoPrincipal};
padding: 0 10px;
height: 50px;
display: flex;
align-items: center;
justify-content: space-between;
border-bottom-left-radius: 8px;
border-bottom-right-radius: 8px;
`
const Logo = styled.p`
    font-size: 32px;
    font-weight: bold;
`

const Cart = styled.div`
    width: 28px;
    margin-right: 20px;
    transition: 0.2s ease-in-out;
    &:hover{
        width: 34px;
        cursor: pointer;
    }
`

export const HeaderBar = () => {
    return (
        <HeaderStyled>
            <Logo>Marvell</Logo>
            <Cart>{CartIcon}</Cart>
        </HeaderStyled>

    )
}