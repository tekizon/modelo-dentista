import { GetStaticProps } from "next";
import Head from "next/head";
import styles from "./styles.module.scss";
import { getPrismicClient } from "../../services/prismic";
import { RichText } from "prismic-dom";
import Prismic from "@prismicio/client";
import { FaYoutube, FaInstagram, FaLinkedin, FaFacebook} from 'react-icons/fa';
import { Footer } from "../../Components/Footer";

type Content = {
  title: string;
  description: string;
  banner: string;
  facebook: string;
  instagram: string;
  youtube: string;
  linkedin: string;
}

interface ContentProps{
  content: Content
}


export default function Sobre({ content }: ContentProps){
    return (
      <>
        <Head>
          <title>Quem somos | Tekizon</title>
          <meta property="og:url" content="https://tekizon.com.br/sobre" />
          <meta property="og:title" content="Página Sobre da Tekizon" />
          <meta property="og:description" content="Exemplo de site da Tekizon Sites Personalizáveis. O que acha de fazer seu site com a gente? Nossos sites contam com sistema de fácil gerenciamento, além de poder ser personalizado por você mesmo a qualquer momento." />
          <meta name="description" content="Este é um exemplo de site da Tekizon Sites Personalizáveis. O que acha de fazer seu site com a gente? Nossos sites contam com sistema de fácil gerenciamento, além de poder ser personalizado por você mesmo a qualquer momento. Outro benefício é que você só paga uma vez." />
        </Head>
        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <section className={styles.ctaText}>
              <h1>{content.title}</h1>
              <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: content.description }}></div>
              <a href={content.youtube}>
                <FaYoutube size={40} />
              </a>

              <a href={content.instagram}>
                <FaInstagram size={40} />
              </a>

              <a href={content.facebook}>
                <FaFacebook size={40} />
              </a>

              <a href={content.linkedin}>
                <FaLinkedin size={40} />
              </a>
            </section>
            

            <img src={content.banner} alt="Sobre Sujeito Programador" />
          </div>
          <hr className={styles.divisor} />
          <section className={styles.founders}>
              <h2>Fundadores</h2>
              <h3><span className={styles.dash}></span>João<span className={styles.dash}></span></h3>
              <p>&rdquo;Opa, tudo bom? Me chamo João e sou especialista em desenvolvimento front-end, além de ter um amplo conhecimento em investimentos e empreendedorismo.&rdquo;</p>
              <hr />
              <h3><span className={styles.dash}></span>Vitor<span className={styles.dash}></span></h3>
              <p>&rdquo;Eai, tudo bem? Me chamo Vitor e sou especialista em Web Design, além de ter conhecimento em investimento e formado em TI.&rdquo;</p>
              <hr />
              <h3><span className={styles.dash}></span>Wellington<span className={styles.dash}></span></h3>
              <p>&rdquo;Daí, tudo bem? Me chamo Wellington e sou especialista em vendas e gerenciamento de empresa, além de ser formado em TI e ter conhecimento em investimento e em programação back-end.&rdquo;</p>
            </section>
        </main>
        <Footer />
      </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();
  
    const response = await prismic.query([
      Prismic.Predicates.at('document.type', 'about')
    ]);

    const {
      title,
      description,
      banner,
      facebook,
      instagram,
      youtube,
      linkedin,
    } = response.results[0].data;
  
    const content = {
      title: RichText.asText(title),
      description: RichText.asText(description),
      banner: banner.url,
      facebook: facebook.url,
      instagram: instagram.url,
      youtube: youtube.url,
      linkedin: linkedin.url,
    };    
  
    return{
      props:{
        content
      },
      revalidate: 60 * 30
    }
  }