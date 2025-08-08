import { colors } from "@/data/colors"
import { Buttons } from "@/styles/Buttons";
import { GibiReqType } from "@/types/GibiItemsType"
import styled from "styled-components"

type Props = {
    item: GibiReqType;
    key: number;
};

const GibiDiv = styled.div`
    padding: 10px;
    color: black;
    background-color: ${colors.brancoSuave};
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
  &:hover{
    cursor: pointer;
    box-shadow: 0px 0px 6px;
    }
`

const TitleArea = styled.div`
    background-color: ${colors.cinzaClaro};
    margin: 10px 0px;
    padding: 5px;
    border-radius: 5px;
    text-align: center;
    height: 60px;
    border: 2px dotted ${colors.cinzaEscuro};
    font-size: 20px;
`
export const GibiArea = ({ item }: Props) => {
    return (
        <GibiDiv key={item.id} >
            <Thumbnails
                onClick={() => { console.log("foi") }}
                src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                alt={item.title}
            ></Thumbnails>
            <div>
                <TitleArea>{item.series.name}</TitleArea>
                <Buttons bgcolor={colors.vermelhoPrincipal} hovercolor={colors.vermelhoPrincipal2} >Comprar</Buttons>
                <Buttons bgcolor={colors.cinzaEscuro} hovercolor={colors.pretoSuave} >Ver Mais</Buttons>
            </div>
        </GibiDiv>
    )
}