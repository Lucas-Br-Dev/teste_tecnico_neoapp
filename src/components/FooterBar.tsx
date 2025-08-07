import { colors } from "@/data/colors"
import styled from "styled-components"

export const FooterBar = () => {

    const AreaFooter = styled.div`
        background-color: ${colors.cinzaEscuro};
        height: 45px;
        padding: 20px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        color: black;
    `

    return(
        <AreaFooter>
            <p>By: <i>Lucas_Br_Dev</i></p>
        </AreaFooter>
    )
}