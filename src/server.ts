import express from 'express';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv-safe';
import mongoose from 'mongoose';

import routes from './routes';

dotenv.config({
    allowEmptyValues: true
});

mongoose.connect(`${process.env.URL_MONGO}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: process.env.USER_MONGO,
    pass: process.env.PASS_MONGO
}, err => {
    if (err) {
        console.log("Ocorreu um erro ao conectar com o banco de dados: " + err)

    } else {
        console.log("Conexão com banco de dados efetuada.")
    }
});

const app = express();
const server = new http.Server(app);

app.use(cors());
app.use(express.json());
app.use(routes);


server.listen(process.env.PORT, () => console.log("Server is running in " + process.env.PORT));

