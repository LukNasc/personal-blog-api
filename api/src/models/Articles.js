"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ArticleSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    banner: String,
    user: String,
});
exports.default = mongoose_1.default.model("Articles", ArticleSchema);
//# sourceMappingURL=Articles.js.map