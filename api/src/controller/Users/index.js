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
const Users_1 = __importDefault(require("../../models/Users"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = module.exports = {
    store(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, password } = req.body;
            if (!user || !password) {
                return res.status(400).json({
                    type: "E",
                    message: "Requisição inválida."
                });
            }
            const userExists = yield Users_1.default.findOne({ user });
            if (userExists) {
                return res.status(400).json({
                    type: "E",
                    message: "Usuário digitado ja existe na base de dados."
                });
            }
            const users = yield Users_1.default.create(req.body);
            if (users) {
                res.status(201).json({
                    type: "S",
                    message: "Usuário cadastrado com sucesso."
                });
            }
            else {
                res.status(500).json({
                    type: "E",
                    message: "Ocorreu um problema ao tentar cadastrar usuário."
                });
            }
        });
    },
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, password } = req.body;
            if (!user || !password) {
                return res.status(400).json({
                    type: "E",
                    message: "Requisição inválida."
                });
            }
            try {
                const findUser = yield Users_1.default.findOne({ user });
                if (findUser && (findUser.user === user && findUser.password === password)) {
                    const id = findUser._id;
                    const token = jsonwebtoken_1.default.sign({ id }, `${process.env.SECRET}`);
                    const response = {
                        id: findUser._id,
                        user: findUser.user,
                        token
                    };
                    return res.status(200).json(response);
                }
                else {
                    return res.status(500).json({
                        type: "E",
                        message: "Ocorreu um erro ao tentar fazer login do usuário."
                    });
                }
            }
            catch (e) {
                console.log(process.env.LOG, e);
                return res.status(500).json({
                    type: "E",
                    message: "Ocorreu um erro desconhecido ao tentar fazer login do usuário.",
                    error: e.message
                });
            }
        });
    }
};
//# sourceMappingURL=index.js.map