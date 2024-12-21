"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodErro = (err) => {
    const errorSources = err.issues.map((issue) => {
        return {
            path: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1],
            message: issue.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'validation Error',
        errorSources
    };
};
exports.default = handleZodErro;
