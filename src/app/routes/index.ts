import { Router } from "express";
import { userRouter } from "../modules/user/user.router";
import { authRoute } from "../modules/auth/auth.route";
import { blogRouter } from "../modules/blog/blog.router";
import { AdminRouter } from "../modules/admin/admin.router";



const router=Router();
const moduleRoutes= [
    {
        path:'/user',
        route:userRouter
    },
    {
        path:'/auth',
        route:authRoute
    },
    {
        path:'/blogs',
        route:blogRouter
    },
    {
    path:'/admin',
    route:AdminRouter
    }
    

]
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;