import { Router } from "express";
import { userRouter } from "../modules/user/user.router";
import { authRoute } from "../modules/auth/auth.route";



const router=Router();
const moduleRoutes= [
    {
        path:'/user',
        route:userRouter
    },
    {
        path:'/auth',
        route:authRoute
    }
    

]
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;