import styles from '../styles/Temporizador.module.css'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

interface TemporizadorProps {
    key: React.Key
    duracao: number
    tempoEsgotado: () => void
}

export default function Temporizador(props: TemporizadorProps) {
    return (
        <div className={styles.temporizador}>
            <CountdownCircleTimer
                duration={props.duracao}
                size={120}
                isPlaying
                onComplete={props.tempoEsgotado}
                colors={[
                    '#BCE596',
                    '#F7B801',
                    '#ED827A',
                ]}
                colorsTime={[10,
                            6,
                            0]}
            >
                {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>

        </div>
    )
}