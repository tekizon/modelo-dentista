import { GetServerSideProps } from "next";
import styles from "./post.module.scss";
import { getPrismicClient } from "../../services/prismic";
import { RichText } from "prismic-dom";
import Head from "next/head";
import Image from "next/image";
import { Footer } from "../../Components/Footer";
 

interface PostProps{
    post: {
        slug: string;
        title: string;
        description: string;
        miniDescription: string;
        cover: string;
        updateAt: string;
    }
}

export default function Post({post}: PostProps){
    return(
        <>
            <Head>
                <title>{post.title}</title>
                <meta property="og:url" content={`https://tekizon.com.br/posts/${post.slug}`} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.miniDescription} />
                <meta name="description" content={post.miniDescription} />

            </Head>
            <main className={styles.container}>
                <article className={styles.post}>
                    <Image 
                        src={post.cover}
                        width={720}
                        height={410}
                        quality={100}
                        alt={post.title}
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOceAQAAewBV8186UYAAAAASUVORK5CYII="
                    />
                    <h1>{post.title}</h1>
                    <time>{post.updateAt}</time>
                    <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: post.description }}>
                        
                    </div>
                </article>
            </main>
            <Footer />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({req, params}) => {
    const {slug} = params;
    const prismic = getPrismicClient(req);

    const response = await prismic.getByUID("post", String(slug), {})

    if(!response){
        return{
            redirect:{
                destination: "/posts",
                permanent: false,
            }
        }
    }

    const post = {
        slug: slug,
        title: RichText.asText(response.data.title),
        description: RichText.asHtml(response.data.description),
        miniDescription: response.data.description.find(content => content.type === "paragraph")?.text ?? "" ,
        cover: response.data.cover.url,
        updateAt: new Date(response.last_publication_date).toLocaleDateString("pt-br", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        })
    }

    

    return{
        props:{
            post,
        }
    }
}