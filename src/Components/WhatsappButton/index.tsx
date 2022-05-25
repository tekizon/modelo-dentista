import { FaWhatsapp } from "react-icons/fa";
import styles from "./styles.module.scss";

export function WhatsappButton(props){

    return(
        <div className={styles.container}>
            <a aria-label="Link para o WhatsApp" href={`https://api.whatsapp.com/send?phone=55${props.link}`}>
                <button aria-label="Botão para o Whatsapp" type="button">
                    <FaWhatsapp  size={30} color="#fff" />
                </button>
            </a>
        </div>
    )
}