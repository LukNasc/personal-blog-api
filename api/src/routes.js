"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verify_1 = __importDefault(require("./auth/verify"));
const Main_1 = __importDefault(require("./controller/Main"));
const Users_1 = __importDefault(require("./controller/Users"));
const Articles_1 = __importDefault(require("./controller/Articles"));
const router = express_1.default.Router();
// Main
router.get('/', [verify_1.default], Main_1.default.index);
// Users
router.post("/users/store", Users_1.default.store);
router.post("/users/login", Users_1.default.login);
// Articles
router.post("/articles/store", [verify_1.default], Articles_1.default.store);
router.get("/articles/list", Articles_1.default.list);
router.get("/articles/getArticleById:ID", Articles_1.default.getArticleById);
exports.default = module.exports = router;
//# sourceMappingURL=routes.js.map