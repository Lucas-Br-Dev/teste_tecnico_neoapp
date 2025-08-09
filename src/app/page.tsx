"use client"
import { HeaderBar } from "@/components/HeaderBar";
import { Container } from "@/styles/ContainerStyle";
import { FooterBar } from "@/components/FooterBar";
import { ListMain } from "@/components/mainList/ListMain";
import { useState } from "react";
import { ModalCart } from "@/components/cart/ModalCart";
import styled from "styled-components";
import { ContextCartProvider } from "@/context/cartContext";
import dynamic from "next/dynamic";


const Flex = styled.div`
  display: flex;
  @media screen and (max-width: 900px) {
      flex-direction: column-reverse;
  }
`

export default function Home() {

  const [modalCart, setModalCart] = useState(false)

  return (
    <Container>
      <ContextCartProvider>
        <HeaderBar onClick={() => setModalCart(!modalCart)} />
        <Flex>
          <ListMain />
          {modalCart && <ModalCart setModal={() => setModalCart(false)} />}
        </Flex>
      </ContextCartProvider>
      <FooterBar />
    </Container>
  );
}
