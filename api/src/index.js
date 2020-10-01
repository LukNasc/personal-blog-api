"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const dotenv_safe_1 = __importDefault(require("dotenv-safe"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
dotenv_safe_1.default.config({
    allowEmptyValues: true
});
mongoose_1.default.connect(`${process.env.URL_MONGO}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: process.env.USER_MONGO,
    pass: process.env.PASS_MONGO
}, err => {
    if (err) {
        console.log("Ocorreu um erro ao conectar com o banco de dados: " + err);
    }
    else {
        console.log("Conexão com banco de dados efetuada.");
    }
});
const app = express_1.default();
const server = new http_1.default.Server(app);
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(routes_1.default);
server.listen(process.env.PORT, () => console.log("Server is running in " + process.env.PORT));
//# sourceMappingURL=index.js.map