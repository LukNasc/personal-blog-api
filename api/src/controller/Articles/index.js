"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Articles_1 = __importDefault(require("../../models/Articles"));
exports.default = module.exports = {
    store(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, title, content, date } = req.body;
            if (!user || !title || !content || !date) {
                return res.status(403).json({
                    type: "E",
                    message: "Requisição inválida"
                });
            }
            try {
                const article = yield Articles_1.default.create(req.body);
                if (article) {
                    return res.status(201).json({
                        type: "S",
                        message: "Artigo publicado com sucesso."
                    });
                }
                else {
                    return res.status(500).json({
                        type: "S",
                        message: "Ocorreu um problema ao tentar publicar o artigo."
                    });
                }
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({
                    type: "S",
                    message: "Ocorreu um problema desconhecido ao tentar publicar o artigo.",
                    error: e.message
                });
            }
        });
    },
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const articles = yield Articles_1.default.find();
                if (articles) {
                    return res.status(200).json(articles.map(art => ({ title: art.title, _id: art._id })));
                }
                else {
                    return res.status(200).json({
                        type: "S",
                        message: "Nenhum artigo foi encontrado."
                    });
                }
            }
            catch (e) {
                return res.status(500).json({
                    type: "S",
                    message: "Ocorreu um problema desconhecido ao tentar recueprar os artigos.",
                    error: e.message
                });
            }
        });
    },
    getArticleById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id } = req.query;
            try {
                const article = yield Articles_1.default.findById({ _id });
                if (article) {
                    return res.status(200).json(article);
                }
                else {
                    return res.status(404).json({
                        type: 'E',
                        message: 'Nenhum artigo encontrado para o ID enviado'
                    });
                }
            }
            catch (e) {
                return res.status(500).json({
                    type: "S",
                    message: "Ocorreu um problema desconhecido ao tentar recuperar o artigo.",
                    error: e.message
                });
            }
        });
    }
};
//# sourceMappingURL=index.js.map