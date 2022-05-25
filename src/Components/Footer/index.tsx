import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/images/tekizon-logo.svg";
import styles from "./styles.module.scss";

export function Footer(){
    return(
        <>
            <footer className={styles.container}>
            <p>Desenvolvido por</p>  
            <Link href="https://tekizon.com.br/">
                <a aria-label="Botão que leva para o site da Tekizon">
                <Image 
                    src={logo}
                    alt="Logotipo da Tekizon"
                    height={35}
                    width={71.5}
                />
                </a>
            </Link>
                                    
            </footer>
        </>
    )
}