"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRouter = void 0;
const express_1 = require("express");
const admin_controller_1 = require("./admin.controller");
const auth_1 = __importDefault(require("../middlewares/auth"));
const user_contant_1 = require("../user/user.contant");
const router = (0, express_1.Router)();
router.delete("/blogs/:id", (0, auth_1.default)(user_contant_1.USER_ROLE.admin), admin_controller_1.adminController.deleteBlog);
router.patch("/users/:userId/block", (0, auth_1.default)(user_contant_1.USER_ROLE.admin), admin_controller_1.adminController.blockUser);
exports.AdminRouter = router;
