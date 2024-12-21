"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_validation_1 = require("./user.validation");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default.Router();
router.post('/user-create', (0, validateRequest_1.default)(user_validation_1.UserValidation.userValidationSchema), user_controller_1.userController.createUser);
router.get('/', user_controller_1.userController.getUser);
router.get('/:userId', user_controller_1.userController.getSingleUser);
router.put('/:userId', user_controller_1.userController.updateUser);
router.delete('/:userId', (0, auth_1.default)('admin'), user_controller_1.userController.deleteUser);
exports.userRouter = router;
