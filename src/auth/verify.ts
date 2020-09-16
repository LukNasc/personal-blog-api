import { Response, Request, NextFunction } from 'express'
import jwt from 'jsonwebtoken';
export default function verifyJWT(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['x-access-token'];

    if (!token) return res.status(401).json({ type: 'E', message: 'Nenhum provedor de token.' });

    jwt.verify(token.toString(), `${process.env.SECRET}`, (err, decoded) => {
        if (err) return res.status(500).json({ type: "E", message: 'Falha ao autenticar o token' });
        //   se tudo estiver ok, passa para a próxima function
        next();
    });
};