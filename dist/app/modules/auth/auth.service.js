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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_model_1 = __importDefault(require("../user/user.model"));
// Register User
const register = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Hash the password before storing
    const hashedPassword = yield bcrypt_1.default.hash(payload.password, 10);
    const result = yield user_model_1.default.create(Object.assign(Object.assign({}, payload), { password: hashedPassword }));
    return result;
});
// Login User
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if user exists
    const user = yield user_model_1.default.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email }).select("+password");
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User not found!");
    }
    // Check if user is blocked
    if (user.status === "blocked") {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "User is blocked!");
    }
    // Validate password
    const isPasswordMatched = yield bcrypt_1.default.compare(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "Incorrect password!");
    }
    // Create JWT
    const jwtPayload = {
        id: user._id,
        email: user.email,
        role: user.role,
    };
    const token = jsonwebtoken_1.default.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: "25d" });
    // Return token and user data
    return {
        token,
        user: {
            id: user._id,
            email: user.email,
            role: user.role,
            status: user.status,
        },
    };
});
exports.AuthService = {
    register,
    login,
};
