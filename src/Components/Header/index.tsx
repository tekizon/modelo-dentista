import styles from "./styles.module.scss";
import Image from "next/image";
import logo from "../../../public/images/tekizon-logo.svg";
import { ActiveLink } from "../ActiveLink";



export function Header(){
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <ActiveLink href="/" activeClassName={styles.active}>
                    <a>
                        <Image
                            quality={100}
                            width={143}
                            height={70} 
                            src={logo} 
                            alt="Logotipo da Tekizon"/>
                    </a>
                </ActiveLink>
               
                <nav>
                    <ActiveLink href="/" activeClassName={styles.active}>
                        <a>Home</a>
                    </ActiveLink>
                    <ActiveLink href="/posts" activeClassName={styles.active}>
                        <a>Posts</a>
                    </ActiveLink>
                    <ActiveLink href="/produtos" activeClassName={styles.active}>
                        <a>Produtos</a>
                    </ActiveLink>
                    <ActiveLink href="/sobre" activeClassName={styles.active}>
                        <a>Sobre</a>
                    </ActiveLink>
                </nav>
                <a className={styles.readyButton} type="button" href="https://api.whatsapp.com/send?phone=5519996255358&text=Opa%20tudo%20bem%3F%20Tenho%20interesse%20no%20site!%20Me%20passa%20mais%20informa%C3%A7%C3%B5es.">
                    QUERO EVOLUIR!
                </a>
            </div>
        </header>
    )
}

