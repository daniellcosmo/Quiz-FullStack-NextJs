import { embaralhar } from "@/functions/array"
import questoes from "../bancoDeQuestoes"

import { NextApiRequest, NextApiResponse } from "next";

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
    const ids = questoes.map(questao => questao.id);
    res.status(200).json(embaralhar(ids));
};

export default handler;