import { ContextCart } from "@/context/cartContext";
import { colors } from "@/data/colors"
import { Buttons } from "@/styles/Buttons";
import { GibiReqType } from "@/types/GibiItemsType"
import { useContext, useState } from "react";
import styled from "styled-components"
import { Alert } from "../Alert";

type Props = {
    item: GibiReqType;
    key: number;
    onClick: () => void;
    isOpen: () => void;
};

type props = {
    $rare: boolean
}

const GibiDiv = styled.div<props>`
    padding: 10px;
    color: black;
    background-color: ${props => props.$rare ? colors.Destaques : colors.brancoSuave};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all ease-in-out 0.2s;
    overflow: hidden;
    &:hover{
        transform: scale(1.04);
    }
`

const Thumbnails = styled.img`
   width: 100%;
  height: 100%;
  margin-bottom: 10px;
  border-radius: 5px;
  &:hover{
    cursor: pointer;
    box-shadow: 0px 0px 6px;
    }
`

const TitleArea = styled.div`
    background-color: ${colors.cinzaClaro};
    padding: 5px;
    border-radius: 5px;
    text-align: center;
    height: 60px;
    border: 2px dotted ${colors.cinzaEscuro};
    font-size: 20px;
`

const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
`
export const GibiArea = ({ item, onClick, isOpen }: Props) => {

    const context = useContext(ContextCart)
    if (!context) return null;
    const { dispatch } = context

    const itemCart = {
        id: item.id,
        title: item.title,
        price: item.prices[0].price,
        quantity: 1,
        thumbnail: {
            path: item.thumbnail.path,
            extension: item.thumbnail.extension,
        },
        rare: item.rare
    }

    return (
        <GibiDiv $rare={item.rare} key={item.id} >
            <Thumbnails
                onClick={onClick}
                src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                alt={item.title}
            ></Thumbnails>
            <Div>
                <TitleArea>{item.series.name}</TitleArea>
                <Buttons onClick={() => (dispatch({ type: "AddCart", payload: itemCart }), isOpen())} $bgcolor={colors.vermelhoPrincipal} $hovercolor={colors.vermelhoPrincipal2} >BUY</Buttons>
                <Buttons onClick={onClick} $bgcolor={colors.cinzaEscuro} $hovercolor={colors.pretoSuave} >See More</Buttons>
            </Div>
        </GibiDiv>
    )
}