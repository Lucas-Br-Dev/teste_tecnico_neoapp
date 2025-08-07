import { colors } from "@/data/colors";
import styled from "styled-components";

type props ={
    bgColor: string;
}

export const Container = styled.div<props>`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0px auto;
    min-height: 100vh;
    background-color: ${(props) => (props.bgColor)};
    
    @media screen and (min-width: 900px) {
        max-width: 1200px;
    }
    @media screen and (max-width: 900px){
        width: 95%;
    }

    @media screen and (max-width: 650px) {
        width: auto;
    }
`