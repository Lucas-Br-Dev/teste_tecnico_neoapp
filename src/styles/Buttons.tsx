import { colors } from "@/data/colors";
import styled from "styled-components";

type props = {
    bgcolor: string;
    hovercolor: string;
}

export const Buttons = styled.button<props>`
    background-color: ${(props) => (props.bgcolor)};
    font-size: 26px;
    width: 100%;
    padding: 5px 10px;
    border-radius: 15px;
    font-weight: bold;
    transition: all ease-in-out 0.1s;
    &:hover{
        background-color: ${(props) => (props.hovercolor)};
        cursor: pointer;
    }
`