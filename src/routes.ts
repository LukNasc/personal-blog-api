import express from 'express';
import verifyJWT from './auth/verify';

import MainController from "./controller/Main";
import UsersController from './controller/Users'
import ArticlesController from './controller/Articles'

const router = express.Router();

// Main
router.get('/', [verifyJWT], MainController.index);

// Users
router.post("/users/store", UsersController.store);
router.post("/users/login", UsersController.login);

// Articles
router.post("/articles/store", [verifyJWT], ArticlesController.store);
router.get("/articles/list", ArticlesController.list);
router.get("/articles/getArticleById:ID", ArticlesController.getArticleById);

export default module.exports = router;