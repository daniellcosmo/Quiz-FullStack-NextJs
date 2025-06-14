import QuestaoModel from '@/model/questao'
import Questionario from '../components/Questionario'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'


const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function Home() {
  const router = useRouter()
  const [idsDasQuestoes, setIdsDasQuestoes] = useState<number[]>([])
  const [questao, setQuestao] = useState<QuestaoModel>()
  const [respostasCertas, setRespostasCertas] = useState<number>(0)

  async function carregarIdsDasQuestoes() {
    const resp = await fetch(`${API_URL}/questionario`)
    const idsDasQuestoes = await resp.json()
    setIdsDasQuestoes(idsDasQuestoes)
  }

  async function carregarQuestao(idQuestao: number) {
    const resp = await fetch(`${API_URL}/questoes/${idQuestao}`)
    const json = await resp.json()
    const novaQuestao = QuestaoModel.criarUsandoObjeto(json)
    setQuestao(novaQuestao)
  }

  useEffect(() => {
    carregarIdsDasQuestoes()
  }, [])

  useEffect(() => {
    if (idsDasQuestoes.length > 0) {
      carregarQuestao(idsDasQuestoes[0])
    }
  }, [idsDasQuestoes])

  function questaoRespondida(questaoRespondida: QuestaoModel) {
    setQuestao(questaoRespondida)
    const acertou = questaoRespondida.acertou
    setRespostasCertas(respostasCertas + (acertou ? 1 : 0))
  }
  function idProximaPergunta() {
    const proximoIndice = questao ? idsDasQuestoes.indexOf(questao.id) + 1 : -1
    return idsDasQuestoes[proximoIndice]
  }

  function irPraProximoPasso() {
    const proximoId = idProximaPergunta()
    if (proximoId) {
      irPraProximaQuestao(proximoId)
    } else {
      finalizar()
    }
  }

  function irPraProximaQuestao(proximoId: number) {
    carregarQuestao(proximoId)
  }

  function finalizar() {
    router.push({
      pathname: "/resultado",
      query: {
        total: idsDasQuestoes.length,
        certas: respostasCertas
      }
    })
  }

  return questao ? (
    <Questionario
      questao={questao}
      ultima={idProximaPergunta() === undefined}
      questaoRespondida={questaoRespondida}
      irPraProximoPasso={irPraProximoPasso}
    ></Questionario>
  ) : false
}
