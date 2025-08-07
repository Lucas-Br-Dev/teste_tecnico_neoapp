"use client"
import { HeaderBar } from "@/components/HeaderBar";
import { Container } from "@/styles/ContainerStyle";
import { colors } from "@/data/colors";
import { FooterBar } from "@/components/FooterBar";
import { ListMain } from "@/components/ListMain";

export default function Home() {
  return (
    <Container bgColor={colors.pretoSuave} >
      <HeaderBar />
    
      <ListMain />

      <FooterBar />
    </Container>
  );
}
