import { Router } from "express";
import { heroeController } from "./heroes.controller";
import { heroeRepositoryImpl } from "../../infrastructure/repositories/heroe.repository";
import { heroeMemoryDataSource } from "../../infrastructure/datasources/heroe-memory.datasource";
import { heroePostgressDatasource } from "../../infrastructure/datasources/heroe-postgres.datasource";


export class routes{
    public static heroeRoutesMemory(): Router{
        const repository = new heroeRepositoryImpl(
            new heroeMemoryDataSource()
        );
        
        const heroeControl = new heroeController(
            repository
        );
        const router = Router();
        
        router.get('/', (req, res) => heroeControl.getHeroes(req, res));
        router.get('/:id', (req, res) => heroeControl.getHeroeById(req, res));
        router.put('/:id', (req, res) => heroeControl.updateHeroe(req, res));
        router.post('/', (req, res) => heroeControl.createHeroe(req, res));
        router.delete('/:id', (req, res) => heroeControl.deleteHeroe(req, res));
        return router;
    }

    public static heroeRoutesDatabase(): Router{
        const repository = new heroeRepositoryImpl(
            new heroePostgressDatasource()
        );
        
        const heroeControl = new heroeController(
            repository
        );
        const router = Router();
        
        router.get('/', (req, res) => heroeControl.getHeroes(req, res));
        router.get('/:id', (req, res) => heroeControl.getHeroeById(req, res));
        router.put('/:id', (req, res) => heroeControl.updateHeroe(req, res));
        router.post('/', (req, res) => heroeControl.createHeroe(req, res));
        router.delete('/:id', (req, res) => heroeControl.deleteHeroe(req, res));
        return router;
    } 
}