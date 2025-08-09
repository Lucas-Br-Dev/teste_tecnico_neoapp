import { colors } from "@/data/colors"
import { gibiCartItemType } from "@/types/GibiCartItemType"
import { Trash } from "@/ui/Trash"
import styled from "styled-components"

type Props = {
    itemCart: gibiCartItemType;
    handleAdd: () => void;
    handleReduce: () => void;
    handleDelete: () => void;
};

type props = {
    $rare: boolean
}

const ItemArea = styled.div<props>`
    margin: 0 auto;
    background-color: ${colors.pretoSuave};
    padding: 16px;
    margin: 8px;
    border-radius: 5px;
    ${props => props.$rare && `border: 2px solid ${colors.Destaques};`}
    ${props => props.$rare && `box-shadow: 0px 0px 6px ${colors.Destaques};`}
`
const Thumbnails = styled.img<props>`
   width: 100px;
    box-shadow: ${props => props.$rare ? `0px 0px 8px ${colors.Destaques}` : `0px 0px 8px ${colors.brancoSuave}`};
    ${props => props.$rare && `border: 2px solid ${colors.Destaques};`}
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
    display: grid;
    grid-template-columns: 1fr 2fr;
    font-size: 20px;
    gap: 16px;
    padding: 10px;
    align-items: center;
    border-bottom: 2px solid ${colors.cinzaClaro};
`

const RareEle = styled.div`
    background-color: ${colors.Destaques};
    color: black;
    padding: 2px 5px;
    font-weight: bold;
    font-size: 14px;
    border-radius: 5px;
`

export const ItemCart = ({ itemCart, handleAdd, handleReduce, handleDelete }: Props) => {

    return (
        <ItemArea $rare={itemCart.rare} >
            <Detail>
                <Thumbnails
                    src={`${itemCart.thumbnail.path}.${itemCart.thumbnail.extension}`}
                    alt={itemCart.title}
                    $rare={itemCart.rare ? true : false}
                />
                <div>
                    <p>{itemCart.title}</p>
                    {itemCart.rare && <RareEle>RARE</RareEle>}
                </div>
            </Detail>
            <Flex>
                <Price>${itemCart.price.toFixed(2)}</Price>
                <Flex>
                    <Flex>
                        <QtdSelect data-cy="cart-selector-add" onClick={handleAdd} >+</QtdSelect>
                        <Qtd>{itemCart.quantity}</Qtd>
                        <QtdSelect data-cy="cart-selector-remove" onClick={handleReduce} >-</QtdSelect>
                    </Flex>
                    <TrashEle data-cy="cart-selector-trash" onClick={handleDelete} >{Trash}</TrashEle>
                </Flex>
            </Flex>
        </ItemArea>

    )
}