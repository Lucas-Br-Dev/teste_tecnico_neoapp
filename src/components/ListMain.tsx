import styled from "styled-components"
import { GibiArea } from "./GibiArea"
import axios from 'axios';
import md5 from 'crypto-js/md5';
import { useEffect, useState } from "react";
import { GibiReqType } from "@/types/GibiItemsType";
import { Loaded } from "./Loaded";

const Grid = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 20px;
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  grid-template-rows: auto;
`;

export const ListMain = () => {
    const [gibiItems, setGibiItems] = useState<GibiReqType[] | undefined>()

    const publicKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY!;
    const privateKey = process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY!;

    useEffect(() => {
        const fetchApiMarvel = async () => {
            const ts = new Date().getTime();
            const hash = md5(ts + privateKey + publicKey).toString();
            const url = `https://gateway.marvel.com/v1/public/comics?format=comic&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

            try {
                const response = await axios.get(url);
                setGibiItems(response.data.data.results);
            } catch (error) {
                console.error("Erro ao buscar gibis:", error);
                alert("Houve um erro, renicie a página!")
            }
        }
        fetchApiMarvel()
    }, []);

    return (
        <main>
            {gibiItems === undefined ?
                <Loaded />
                :
                <Grid>
                    {gibiItems.map((item) => (<GibiArea key={item.id} item={item} />))}
                </Grid>
            }
        </main>
    )
}