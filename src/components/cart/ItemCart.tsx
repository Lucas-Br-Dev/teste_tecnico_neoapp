import { ContextCart } from "@/context/cartContext"
import { colors } from "@/data/colors"
import { gibiCartItemType } from "@/types/GibiCartItemType"
import { Trash } from "@/ui/Trash"
import { useContext } from "react"
import styled from "styled-components"

type Props = {
    itemCart: gibiCartItemType;
    handleAdd: () => void;
    handleReduce: () => void;
    handleDelete: () => void;
};

const ItemArea = styled.div`
    margin: 0 auto;
    background-color: ${colors.pretoSuave};
    padding: 16px;
    margin: 8px;
    border-radius: 5px;
`
const Thumbnails = styled.img`
   width: 100px;
    box-shadow: 0px 0px 6px;
    border-radius: 5px;
    transition: all ease-in-out 0.3s;
    &:hover{
        transform: rotate(10deg);
    }
`
const Price = styled.p`
    font-size: 28px;
`

const Flex = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: ${colors.cinzaEscuro};
`
const TrashEle = styled.div`
    width: 25px;
    margin-left: 10px;
    background-color: ${colors.vermelhoPrincipal};
    border: 1px solid ${colors.pretoSuave};
    display: flex;
    justify-content: center;
    align-items: center;    
    &:hover{
        cursor: pointer;
    }
`
const QtdSelect = styled.div`
    font-size: 18px;
    border: 1px solid ${colors.pretoSuave};
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    &:hover{
        background-color: ${colors.vermelhoPrincipal};
        cursor: pointer;
    }

`
const Qtd = styled.div`
    font-size: 20px;
    margin: 0 5px;
`
const Detail = styled.div`
    display: flex;
    gap: 16px;
    padding: 10px;
    align-items: center;
    border-bottom: 2px solid ${colors.cinzaClaro};
`

export const ItemCart = ({itemCart, handleAdd, handleReduce, handleDelete}: Props) => {

    return (
        <ItemArea>
            <Detail>
                <Thumbnails
                    src={`${itemCart.thumbnail.path}.${itemCart.thumbnail.extension}`}
                    alt={itemCart.title}
                />
                <p>{itemCart.title}</p>
            </Detail>
            <Flex>
                <Price>${ itemCart.price.toFixed(2) }</Price>
                <Flex>
                    <Flex>
                        <QtdSelect onClick={handleAdd} >+</QtdSelect>
                        <Qtd>{itemCart.quantity}</Qtd>
                        <QtdSelect onClick={handleReduce} >-</QtdSelect>
                    </Flex>
                    <TrashEle onClick={handleDelete} >{Trash}</TrashEle>
                </Flex>
            </Flex>
        </ItemArea>

    )
}