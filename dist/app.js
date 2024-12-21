"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorhandler_1 = __importDefault(require("./app/modules/middlewares/globalErrorhandler"));
const app = (0, express_1.default)();
// parsers api
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// -----api end point--------
app.use('/api', routes_1.default);
app.use(globalErrorhandler_1.default);
// -----root api endpoint------
app.get('/', (req, res) => {
    res.send({
        status: true,
        message: 'blog_post Server is running successfully 🏃🏽‍♂️➡️',
    });
});
app.use("*", (req, res) => {
    res.status(404).json({
        status: false,
        message: 'Route not found'
    });
});
exports.default = app;
