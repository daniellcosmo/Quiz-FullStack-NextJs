import styles from '../styles/Botao.module.css'
import Link from 'next/link'

interface BotaoProps {
    texto: string
    href?: string
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void

}

export default function Botao(props: BotaoProps) {

    function renderizaroBotao() {
        return (
            <button className={styles.botao}
                onClick={props.onClick}
            >
                {props.texto}
            </button>
        )
    }

    return props.href ? (
        <Link href={props.href}>
            {renderizaroBotao()}
        </Link>
    ) : renderizaroBotao()
}