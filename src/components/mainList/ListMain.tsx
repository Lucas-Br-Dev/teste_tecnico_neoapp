import styled from "styled-components"
import { GibiArea } from "./GibiArea"
import axios from 'axios';
import md5 from 'crypto-js/md5';
import { useEffect, useState } from "react";
import { GibiReqType } from "@/types/GibiItemsType";
import { Loaded } from "./Loaded";
import { SelectGibiModal } from "./SelectGibiModal";
import { AnimationRigthToLeft } from "@/styles/AnimationRigthToLeft";
import { Alert } from "../Alert";
import { Flamenco } from "next/font/google";


const Grid = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 20px;
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  grid-template-rows: auto;
`;

const Main = styled.main`
    width: 100%;
`

export const ListMain = () => {
    const [gibiItems, setGibiItems] = useState<GibiReqType[] | null>(null);
    const [selectGibi, setSelectGibi] = useState<null | GibiReqType>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [alertApi, setAlertApi] = useState(false);


    useEffect(() => {
        if (selectGibi !== null) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            return
        }
    }, [selectGibi])

    const publicKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY!;
    const privateKey = process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY!;

    useEffect(() => {
        const fetchApiMarvel = async () => {
            const ts = new Date().getTime();
            const hash = md5(ts + privateKey + publicKey).toString();
            const url = `https://gateway.marvel.com/v1/public/comics?format=comic&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

            try {
                const response = await axios.get(url);
                const data = response.data.data.results;

                // Filtrar apenas os gibis que possuem thumbnail
                const thumbnailNotFould = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
                const filteredData = data.filter((item: GibiReqType) => `${item.thumbnail.path}.${item.thumbnail.extension}` !== thumbnailNotFould);


                const gerarValoresAleatorio = () => {
                    // Selecionar 10% dos gibis
                    const qtdGibisRares = Math.ceil(filteredData.length * 0.10);
                    const valores: number[] = []
                    //selecionar aleatoriamente os 10%
                    while (valores.length < qtdGibisRares) {
                        const gerarValorAleatorio = (Math.random() * filteredData.length).toFixed(0)
                        if (!valores.includes(Number(gerarValorAleatorio)))
                            valores.push(Number(gerarValorAleatorio))
                    }
                    return valores
                }
                const indexAleatorios = gerarValoresAleatorio();

                indexAleatorios.forEach((item) => {
                    if (item - 1 <= 0) {
                        filteredData[0].rare = true;
                    } else {
                        filteredData[item - 1].rare = true;
                    }
                })
                setGibiItems(filteredData)
            } catch (error) {
                console.error("Erro ao buscar gibis:", error);
                setAlertApi(true);
                
            }
        }
        fetchApiMarvel()
    }, []);

    return (
        <Main>
                {alertApi && <Alert action={() => window.location.reload()} isOpen={() => setAlertApi(false)} message="error when loading" messageButton="OK" />}
            {selectGibi ? (
                <AnimationRigthToLeft>
                    <SelectGibiModal selectGibi={selectGibi} setSelectGibi={() => setSelectGibi(null)} />
                </AnimationRigthToLeft>
            ) : (
                <>
                    {gibiItems === null ? (
                        <Loaded />
                    ) : (
                        <Grid data-cy="list-main-grid" >
                            {isOpen &&
                                <Alert
                                    isOpen={() => setIsOpen(false)} message="Added To Cart" messageButton="OK"
                                />
                            }
                            {gibiItems.map(item => (
                                <GibiArea key={item.id} item={item} onClick={() => setSelectGibi(item)} isOpen={() => (setIsOpen(true), window.scrollTo({ top: 0, behavior: 'smooth' }))} />
                            ))}
                        </Grid>
                    )}
                </>
            )}
        </Main>
    );
}
export default ListMain