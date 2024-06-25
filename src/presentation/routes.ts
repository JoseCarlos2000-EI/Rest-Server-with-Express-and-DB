import { Router } from "express";
import { routes } from "./heroes/heroes.router";


export class AppRoutes{
    public static routes(): Router{
        const router = Router();
        router.use('/v1/heroes', routes.heroeRoutesMemory());
        router.use('/v2/heroes', routes.heroeRoutesDatabase());
        return router;
    }
}