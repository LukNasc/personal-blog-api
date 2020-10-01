import Articles, { ArticleModel } from '../../models/Articles';
import { Request, Response, NextFunction } from 'express';

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
            const articles: ArticleModel[] = await Articles.find();
            if (articles) {
                return res.status(200).json(
                    articles.map(art => ({ title: art.title, _id: art._id }))
                );
            } else {
                return res.status(200).json({
                    type: "S",
                    message: "Nenhum artigo foi encontrado."
                })
            }
        } catch (e) {
            return res.status(500).json({
                type: "S",
                message: "Ocorreu um problema desconhecido ao tentar recueprar os artigos.",
                error: e.message
            })
        }

    },
    async getArticleById(req: Request, res: Response, next: NextFunction) {
        const { _id } = req.query;
        try {
            const article: ArticleModel | null = await Articles.findById({ _id });
            if (article) {
                return res.status(200).json(article);
            } else {
                return res.status(404).json({
                    type: 'E',
                    message: 'Nenhum artigo encontrado para o ID enviado'
                })
            }
        } catch (e) {
            return res.status(500).json({
                type: "S",
                message: "Ocorreu um problema desconhecido ao tentar recuperar o artigo.",
                error: e.message
            })
        }
    }
}