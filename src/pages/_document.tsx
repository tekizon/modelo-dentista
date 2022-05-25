import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document{
    render(){
        return(
            <Html lang="pt-br">
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700;900&display=swap" rel="stylesheet" />
                    <link rel="shortcut icon" href="/favicon.png" type="image/png" />
                    <meta name="twitter:card" content="summary" />
                    <meta property="og:image" content="https://images.prismic.io/tekizon/f2ab03a0-9100-47cb-94fa-47865f82f0f7_Preview-Link.png?auto=compress,format&w=900" />
                    <meta property="og:image:type" content="image/png"/>
                    <meta property="og:image:width" content="1200"/>
                    <meta property="og:image:height" content="630"/>
                    <meta property="og:locale" content="pt_BR" />
                    <meta property="og:type" content="website"/>
                    <meta name="keywords" content="Sites Personalizados, Website, Criação de Site, Criação de Website, Criação de Landing Page"></meta>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}