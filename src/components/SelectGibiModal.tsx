import { colors } from "@/data/colors";
import { Buttons } from "@/styles/Buttons";
import { GibiReqType } from "@/types/GibiItemsType"
import { ArrowLeftCircle } from "@/ui/ArrowLeftCircle";
import styled from "styled-components";
import { GibiArea } from "./GibiArea";
import { creatorsType } from "@/types/CreatorsType";

type Props = {
    selectGibi: GibiReqType;
    setSelectGibi: () => void
}

const ModalArea = styled.div`
    display: flex;
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
    justify-content: space-between;
    border-radius: 5px;
    padding: 10px;
    background-color: ${colors.cinzaClaro};
`

const P = styled.p`
    font-size: 28px;
    margin-bottom: 10px;
    @media screen and (max-width: 900px) {
        font-size: 20px;
    }

`

const Price = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    background-color: ${colors.cinzaEscuro};
    border-radius: 10px;
    padding: 10px;
    color: white;
    font-size: 40px;
    @media screen and (max-width: 900px) {
        font-size: 26px;
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



    return (
        <ModalArea>

            <Space>
                <Arrow onClick={() => {setSelectGibi()}} >{ArrowLeftCircle}</Arrow>
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
                        <Buttons bgcolor={colors.vermelhoPrincipal} hovercolor={colors.vermelhoPrincipal2} >COMPRAR</Buttons>
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