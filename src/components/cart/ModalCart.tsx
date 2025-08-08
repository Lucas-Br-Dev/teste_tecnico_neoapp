import { ContextCart } from "@/context/cartContext"
import { colors } from "@/data/colors"
import { CircleX } from "@/ui/CircleX"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { Buttons } from "@/styles/Buttons"
import { ArrowRigth } from "@/ui/ArrowRigth"
import { AnimationRigthToLeft } from "@/styles/AnimationRigthToLeft"
import { ItemCart } from "./ItemCart"

type Props = {
    setModal: () => void
}

const Modal = styled.div`
    width: 400px;
    background-color: ${colors.cinzaEscuro};
    border-radius: 10px;
    margin-top: 18px;
    margin-left: 10px;
    text-align: center;
    align-self: flex-start;
    @media screen and (max-width: 900px){
        width: 100%;
        margin-left: 0;
        margin-bottom: 18px;
    }
`

const Circle = styled.div`
    width: 40px;
    transition: all ease-in-out 0.2s;
    &:hover{
        cursor: pointer;
        transform: rotate(90deg);
    }
`
const Title = styled.p`
    font-size: 28px;
    margin: 0px 20px;
    margin-bottom: 20px;
    border-bottom: solid 2px ${colors.pretoSuave};
`
const Items = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`
const Cupom = styled.input`
        outline: none;
        border: none;
        width: 100%;
        font-size: 18px;
    background-color: ${colors.pretoSuave};
`
const CupomArea = styled.div`
width: 90%;
    padding: 2px;
    border-radius: 5px;
    border: 1px solid ${colors.cinzaEscuro};
    margin: 5px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
`

const ArrowEle = styled.div`
    width: 30px;
    height: 28px;
    border-radius: 10px;
    border: 2px solid ${colors.cinzaClaro};
    background-color: ${colors.vermelhoPrincipal};
    &:hover{
        cursor: pointer;
        background-color: ${colors.vermelhoPrincipal2};
    }
`
const Total = styled.p`
    font-size: 26px;
`
const BuyEle = styled.div`
    background-color: ${colors.pretoSuave};
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
`

export const ModalCart = ({ setModal }: Props) => {

    const context = useContext(ContextCart)
    if (!context) return null;
    const { dispatch } = context
    const [valueTotal, setValueTotal] = useState(0)

    useEffect(() => {
        if (!context) return;

        const total = context.gibiCart.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);
        setValueTotal(total);
    }, [context?.gibiCart]);



    return (
        <AnimationRigthToLeft>
            <Modal>
                <div>
                    <Circle onClick={setModal} >{CircleX}</Circle>
                    <Title>Cart Items</Title>
                </div>
                {context?.gibiCart.length === 0 ?
                    <h1>The cart is empty</h1>
                    :
                    <Items>
                        {context?.gibiCart.map((item) => (
                            <ItemCart
                            key={item.id}
                             itemCart={item} 
                             handleAdd={() => dispatch({type:"AddQuantity", payload: {id: item.id}})}
                             handleReduce={() => dispatch({type:"RemoveQuantity", payload:{id: item.id}})}
                             handleDelete={() => dispatch({type:"DeleteItem", payload:{id: item.id}})}
                             />
                        ))}
                        <BuyEle>
                            <CupomArea>Value Total: ${valueTotal.toFixed(2)}</CupomArea>
                            <CupomArea><Cupom placeholder="CUPOM..." maxLength={4} type="text" /><ArrowEle>{ArrowRigth}</ArrowEle></CupomArea>
                            <Buttons bgcolor={colors.vermelhoPrincipal} hovercolor={colors.vermelhoPrincipal2} >Comprar</Buttons>
                        </BuyEle>
                    </Items>
                }
            </Modal>
        </AnimationRigthToLeft>
    )
}