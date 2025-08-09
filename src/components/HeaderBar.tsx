import { ContextCart } from "@/context/cartContext";
import { colors } from "@/data/colors";
import { CartIcon } from "@/ui/CartIcon";
import { useContext } from "react";
import styled from "styled-components";

type Props = {
    onClick: () => void
}

const HeaderStyled = styled.header`
    background-color: ${colors.cinzaEscuro};
    padding: 0 10px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
`
const Logo = styled.p`
    border-radius: 5px;
    font-size: 32px;
    font-weight: bold;
    padding: 0 10px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${colors.vermelhoPrincipal};
`

const Cart = styled.div`
    display: flex;
    justify-content: end;
    width: 30px;
    margin-right: 20px;
    transition: 0.2s ease-in-out;
    &:hover{
        transform: rotate(45deg);
        cursor: pointer;
        color: white;
    }
`

const Area = styled.div`
    width: 30px;
    margin-left: 20px;
`

export const HeaderBar = ({ onClick }: Props) => {

    const context = useContext(ContextCart)

    return (
        <HeaderStyled>
            <Area></Area>
            <Logo>Marvell</Logo>
            <Cart data-cy="cart-icon" onClick={onClick} >{CartIcon}{context?.gibiCart.length}</Cart>
        </HeaderStyled>

    )
}