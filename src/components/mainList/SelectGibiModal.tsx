import { colors } from "@/data/colors";
import { Buttons } from "@/styles/Buttons";
import { GibiReqType } from "@/types/GibiItemsType"
import { ArrowLeftCircle } from "@/ui/ArrowLeftCircle";
import styled from "styled-components";
import { creatorsType } from "@/types/creatorsType";
import { useContext } from "react";
import { ContextCart } from "@/context/cartContext";

type Props = {
    selectGibi: GibiReqType;
    setSelectGibi: () => void
}

const ModalArea = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 10px;
    color: black;
    background-color: ${colors.brancoSuave};
    border-radius: 5px;
    transition: all ease-in-out 0.2s;
    overflow: hidden;
`

const ShowInformations = styled.div`
    display: grid;
    gap: 50px;
    border-bottom: 2px dotted ${colors.cinzaEscuro};
    padding: 10px;
    grid-template-columns: 1fr 2fr;
    @media screen and (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`

const Thumbnails = styled.img`
  height: 600px;
  border-radius: 5px;
  @media screen and (max-width: 900px) {
        height: 400px;
        margin: auto;
    }
`

const ModalPrice = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 5px;
    @media screen and (max-width: 900){
        width: 100%;
        
    }
`

const P = styled.p`
    font-size: 28px;
    margin-bottom: 10px;
    background-color: ${colors.cinzaClaro};
    border-radius: 5px;
    padding: 5px;
    @media screen and (max-width: 900px) {
        font-size: 20px;
    }
`

const Price = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background-color: ${colors.cinzaEscuro};
    border-radius: 10px;
    padding: 10px;
    color: white;
    font-size: 32px;
    gap: 16px;
    @media screen and (max-width: 900px) {
        font-size: 28px;
    }
`

const Description = styled.p`
    font-size: 28px;
    border-bottom: solid 2px ${colors.pretoSuave};
    margin: 10px 20px;
`

const Arrow = styled.div`
    width: 50px;
    &:hover{
        cursor: pointer;
        transform: rotate(-10deg);
    }
`

const Space = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 900px) {
        display: block;
    }

`

const lancamento = (onsaleDate: string) => {
    const dataCorrigida = onsaleDate.replace(/([+-]\d{2})(\d{2})$/, "$1:$2");
    const data = new Date(dataCorrigida);

    if (isNaN(data.getTime())) {
        return "Data inválida";
    }

    return data.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

const getCreators = (items: creatorsType[]) => {
    return items.map((item) => (`${item.role}/ ${item.name}`))
}

export const SelectGibiModal = ({ selectGibi, setSelectGibi }: Props) => {

    const context = useContext(ContextCart)
    if (!context) return null;
    const { dispatch } = context

    const itemCart = {
        id: selectGibi.id,
        title: selectGibi.title,
        price: selectGibi.prices[0].price,
        quantity: 1,
        thumbnail: {
            path: selectGibi.thumbnail.path,
            extension: selectGibi.thumbnail.extension,
        }
    }


    return (
        <ModalArea>
            <Space>
                <Arrow onClick={() => { setSelectGibi() }} >{ArrowLeftCircle}</Arrow>
                <h1>{selectGibi.title}</h1>
                <div></div>
            </Space>
            <ShowInformations>
                <Thumbnails
                    src={`${selectGibi.thumbnail.path}.${selectGibi.thumbnail.extension}`}
                    alt={selectGibi.title} >
                </Thumbnails>
                <ModalPrice>
                    <P>Published: {lancamento(selectGibi.dates[0].date)}</P>
                    <P>Creators: {getCreators(selectGibi.creators.items)}</P>
                    <Price>
                        <h1>${selectGibi.prices[0].price}</h1>
                        <Buttons onClick={() => dispatch({ type: "AddCart", payload: itemCart })} $bgcolor={colors.vermelhoPrincipal} $hovercolor={colors.vermelhoPrincipal2} >BUY</Buttons>
                    </Price>
                </ModalPrice>
            </ShowInformations>
            <div>
                <Description>description:</Description>
                <P>{selectGibi.textObjects[0].text}</P>
            </div>
        </ModalArea>
    )
}