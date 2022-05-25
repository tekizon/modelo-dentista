import { GetStaticProps } from "next";
import Head from "next/head";
import styles from "../styles/home.module.scss";
import { getPrismicClient } from "../services/prismic";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";

import Image from "next/image";
import techsImage from "../../public/images/techs.svg";
import { WhatsappButton } from "../Components/WhatsappButton";
import { Footer } from "../Components/Footer";

type Content ={
  titlePart1: string;
  textPart1: string;
  buttonPart1: string;
  imagePart1: string;
  titlePart2: string;
  textPart2: string;
  imagePart2: string;
  titlePart3: string;
  textPart3: string;
  imagePart3: string;
  image1Part4: string;
  text1Part4: string;
  image2Part4: string;
  text2Part4: string;
  image3Part4: string;
  text3Part4: string;
  whatsappNumber: string;
}

interface ContentProps{
  content: Content
}

export default function Home({ content }: ContentProps) {
  return (
    <>
      <Head>
        <title>Home | Tekizon</title> 
        <meta property="og:url" content="https://tekizon.com.br/" />
        <meta property="og:title" content="Página Inicial da Tekizon" />
        <meta property="og:description" content="Exemplo de site da Tekizon Sites Personalizáveis. O que acha de fazer seu site com a gente? Nossos sites contam com sistema de fácil gerenciamento, além de poder ser personalizado por você mesmo a qualquer momento." />
        <meta name="description" content="Este é um exemplo de site da Tekizon Sites Personalizáveis. O que acha de fazer seu site com a gente? Nossos sites contam com sistema de fácil gerenciamento, além de poder ser personalizado por você mesmo a qualquer momento. Outro benefício é que você só paga uma vez." />
      </Head>
      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <section className={styles.ctaText}>
            <h1>Bem-vindo ao site da melhor dentista de Itapira</h1>
            <span>Prazer, sou a Doutora Verônica, formada em odontologia, e atendo na região de Itapira...</span>
            <a href={content.buttonPart1}>
              <button>
                AGENDAR UMA CONSULTA!
              </button>
            </a>
          </section>
          <img src="/images/print.jpg" alt="Conteúdos da sua empresa" />
        </div>

        <hr className={styles.divisor} />

        <div className={styles.sectionContent}> 
          <section>
          <h2>Formação</h2>
            <p>- Cirurgião Dentista - Universidade Federal de Alfenas</p>
            <p>- Especialista em Harmonização Orofacial</p>
            <p>- Pós Graduanda em Orto</p>
          </section>
          <img src="/images/facul-odonto.png" alt="Conteúdos desenvolvimento de Apps" />
        </div>

        <hr className={styles.divisor} />

        <div className={styles.sectionContent}> 
          <img src="/images/procedimentos.png" alt="Conteúdos desenvolvimento de aplicações Web" />
          <section>
          <h2 className={styles.secondImage}>Procedimentos que faço</h2>
            <p>- Bichequitomia</p>
            <p>- Preenchimento Labial</p>
            <p>- Botox</p>
            <p>- Clareamento</p>
            <p>- Facetas</p>
          </section>
        </div>

        <hr className={styles.divisor} />

        <div className={styles.benefits}>
          <div className={styles.benefit}>
            <Image
              src={content.image1Part4}
              alt={content.text1Part4}
              width={110}
              height={110}
            />
            <p>{content.text1Part4}</p>
          </div>
          <div className={styles.benefit}>
            <Image 
              src={content.image2Part4} 
              alt={content.text2Part4}
              width={110}
              height={110}  
            />
            <p>{content.text2Part4}</p>
          </div>
          <div className={styles.benefit}>
            <Image 
              src={content.image3Part4} 
              alt={content.text3Part4} 
              width={110}
              height={110}
            />
            <p>{content.text3Part4}</p>
          </div>
        </div>

      <hr className={styles.divisor} />

        <div className={styles.nextLevelContent}>
          <Image src={techsImage} alt="Tecnologias" />
          <h2>Mais de <span className={styles.alunos}>100</span> clientes já saíram satisfeito.</h2>
          <span>Venha você também conhecer!</span>
          <a href={content.buttonPart1}>
            <button>AGENDAR UMA CONSULTA!</button>
          </a>
        </div>
        <WhatsappButton link={content.whatsappNumber} />
      </main>
      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query([
    Prismic.Predicates.at("document.type", "home")
  ]);

  const responseTwo = await prismic.query([
    Prismic.Predicates.at("document.type", "whatsapp")
  ]);
  
  const {
    parte1_titulo, parte1_texto, parte1_botao, parte1_imagem,
    parte2_titulo, parte2_texto, parte2_imagem,
    parte3_titulo, parte3_texto, parte3_imagem,
    parte4_imagem1, parte4_texto1, 
    parte4_imagem2, parte4_texto2,
    parte4_imagem3, parte4_texto3,
  } = response.results[0].data;

  const { whatsapp_number } = responseTwo.results[0].data;

  const content = {
    titlePart1: RichText.asText(parte1_titulo),
    textPart1: RichText.asText(parte1_texto),
    buttonPart1: parte1_botao.url,
    imagePart1: parte1_imagem.url,
    titlePart2: RichText.asText(parte2_titulo),
    textPart2: RichText.asText(parte2_texto),
    imagePart2: parte2_imagem.url,
    titlePart3: RichText.asText(parte3_titulo),
    textPart3: RichText.asText(parte3_texto),
    imagePart3: parte3_imagem.url,
    image1Part4: parte4_imagem1.url,
    text1Part4: RichText.asText(parte4_texto1),
    image2Part4: parte4_imagem2.url,
    text2Part4: RichText.asText(parte4_texto2),
    image3Part4: parte4_imagem3.url,
    text3Part4: RichText.asText(parte4_texto3),
    whatsappNumber: RichText.asText(whatsapp_number),
  }

  return{
    props:{
      content
    },
    revalidate: 60 * 5
  }
}