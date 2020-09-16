import User, { UserModel } from '../../models/Users';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default module.exports = {
    async store(req: Request, res: Response, next: NextFunction) {
        const { user, password } = req.body;
        if (!user || !password) {
            return res.status(400).json({
                type: "E",
                message: "Requisição inválida."
            })
        }

        const userExists = await User.findOne({ user });

        if (userExists) {
            return res.status(400).json({
                type: "E",
                message: "Usuário digitado ja existe na base de dados."
            })
        }

        const users = await User.create(req.body);

        if (users) {
            res.status(201).json({
                type: "S",
                message: "Usuário cadastrado com sucesso."
            })
        } else {
            res.status(500).json({
                type: "E",
                message: "Ocorreu um problema ao tentar cadastrar usuário."
            })
        }
    },

    async login(req: Request, res: Response, next: NextFunction) {
        const { user, password } = req.body;

        if (!user || !password) {
            return res.status(400).json({
                type: "E",
                message: "Requisição inválida."
            })
        }

        try {
            const findUser: UserModel | null = await User.findOne({ user });

            if (findUser && (findUser.user === user && findUser.password === password)) {
                const id = findUser._id;
                const token = jwt.sign({ id }, `${process.env.SECRET}`);
                const response = {
                    id: findUser._id,
                    user: findUser.user,
                    token
                }
                return res.status(200).json(response);
            } else {
                return res.status(500).json({
                    type: "E",
                    message: "Ocorreu um erro ao tentar fazer login do usuário."
                })

            }
        } catch (e) {
            console.log(process.env.LOG, e);
            return res.status(500).json({
                type: "E",
                message: "Ocorreu um erro desconhecido ao tentar fazer login do usuário.",
                error: e.message
            })
        }

    }
}