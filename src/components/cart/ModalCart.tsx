import { ContextCart } from "@/context/cartContext"
import { colors } from "@/data/colors"
import { CircleX } from "@/ui/CircleX"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { Buttons } from "@/styles/Buttons"
import { ArrowRigth } from "@/ui/ArrowRigth"
import { AnimationRigthToLeft } from "@/styles/AnimationRigthToLeft"
import { ItemCart } from "./ItemCart"
import { Alert } from "../Alert"

type Props = {
    setModal: () => void;
}

const Modal = styled.div`
position: relative;
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
    padding: 5px;
    border-radius: 5px;
    border: 1px solid ${colors.cinzaEscuro};
    margin: 5px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
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
    const [couponInput, setCouponInput] = useState("")
    const [isCouponApplied, setIsCouponApplied] = useState(false)

    useEffect(() => {
        if (couponInput.length === 6) {
            dispatch({ type: "Coupon", payload: { code: couponInput } });
            if (couponInput === "COMM15" || couponInput === "RARE20") {
                setIsCouponApplied(true);
            } else {
                setIsCouponApplied(false);

            }
        }
    }, [couponInput])

    useEffect(() => {
        if (!context) return;

        const total = context.gibiCart.reduce((valor, item) => {
            return valor + item.price * item.quantity;
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
                                handleAdd={() => dispatch({ type: "AddQuantity", payload: { id: item.id } })}
                                handleReduce={() => dispatch({ type: "RemoveQuantity", payload: { id: item.id } })}
                                handleDelete={() => dispatch({ type: "DeleteItem", payload: { id: item.id } })}
                            />
                        ))}
                        <BuyEle>
                            <CupomArea>Value Total: ${valueTotal.toFixed(2)}</CupomArea>
                            <CupomArea>
                                <Cupom
                                    data-cy="coupon-input"
                                    disabled={isCouponApplied}
                                    placeholder="COUPON..."
                                    maxLength={6} type="text"
                                    value={couponInput}
                                    onChange={(e) => setCouponInput(e.target.value.toLocaleUpperCase())}
                                />
                            </CupomArea>
                            <Buttons $bgcolor={colors.vermelhoPrincipal} $hovercolor={colors.vermelhoPrincipal2} >Buy</Buttons>
                        </BuyEle>
                    </Items>
                }
            </Modal>
        </AnimationRigthToLeft>
    )
}