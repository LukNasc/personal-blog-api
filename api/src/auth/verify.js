"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token)
        return res.status(401).json({ type: 'E', message: 'Nenhum provedor de token.' });
    jsonwebtoken_1.default.verify(token.toString(), `${process.env.SECRET}`, (err, decoded) => {
        if (err)
            return res.status(500).json({ type: "E", message: 'Falha ao autenticar o token' });
        //   se tudo estiver ok, passa para a próxima function
        next();
    });
}
exports.default = verifyJWT;
;
//# sourceMappingURL=verify.js.map