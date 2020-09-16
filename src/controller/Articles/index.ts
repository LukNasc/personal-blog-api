import Articles from '../../models/Articles';
import { Request, Response, NextFunction, json } from 'express';

export default module.exports = {
    async store(req: Request, res: Response, next: NextFunction) {
        const { user, title, content, date } = req.body;
        if (!user || !title || !content || !date) {
            return res.status(403).json({
                type: "E",
                message: "Requisição inválida"
            })
        }
        try {
            const article = await Articles.create(req.body);

            if (article) {
                return res.status(201).json({
                    type: "S",
                    message: "Artigo publicado com sucesso."
                })
            } else {
                return res.status(500).json({
                    type: "S",
                    message: "Ocorreu um problema ao tentar publicar o artigo."
                })
            }
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                type: "S",
                message: "Ocorreu um problema desconhecido ao tentar publicar o artigo.",
                error: e.message
            })
        }

    },

    async list(req: Request, res: Response, next: NextFunction) {
        try {
            const articles = await Articles.find();
            if (articles) {
                return res.status(200).json(articles);
            } else {
                return res.status(200).json({
                    type: "S",
                    message: "Nenhum relatório foi encontrado."
                })
            }
        } catch (e) {
            return res.status(500).json({
                type: "S",
                message: "Ocorreu um problema desconhecido ao tentar publicar o artigo.",
                error: e.message
            })
        }

    }
}