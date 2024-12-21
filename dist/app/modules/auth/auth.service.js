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
exports.AuthService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
// ---------- register-------
const register = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(payload);
    return result;
});
/*
#######-----------------------------######
            login
#####--------------------------------#######
*/
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking user is exist
    const user = yield user_model_1.User.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email }).select('+password');
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is blocked
    const status = user === null || user === void 0 ? void 0 : user.status;
    if (status === 'blocked') {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, 'This user is blocked !');
    }
    /*
    ----------------
    checking  password  correct
    ---------------------
    */
    const isPasswordMatched = yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, 'Wrong Password 😈! provide correct password ');
    }
    /*
    ---------------------------------------
    create token and sent to the  client
    ----------------------------------------
    */
    const jwtPayload = {
        email: user === null || user === void 0 ? void 0 : user.email,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    const token = jsonwebtoken_1.default.sign(jwtPayload, "secret", { expiresIn: '25d' });
    return { token, user };
});
exports.AuthService = {
    register, login
};
