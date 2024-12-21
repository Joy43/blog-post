"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_router_1 = require("../modules/user/user.router");
const auth_route_1 = require("../modules/auth/auth.route");
const blog_router_1 = require("../modules/blog/blog.router");
const admin_router_1 = require("../modules/admin/admin.router");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/user',
        route: user_router_1.userRouter
    },
    {
        path: '/auth',
        route: auth_route_1.authRoute
    },
    {
        path: '/blogs',
        route: blog_router_1.blogRouter
    },
    {
        path: '/admin',
        route: admin_router_1.AdminRouter
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
