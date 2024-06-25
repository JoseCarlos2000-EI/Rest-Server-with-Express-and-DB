import { json, Request, Response } from "express";
import { heroeRepositoryImpl } from "../../infrastructure/repositories/heroe.repository";
import { heroeEntity } from "../../domain/entities/heroe.entity";
import { uuid } from "../../config/plugins/uuid.plugin";

export class heroeController{
    constructor(
        public readonly repository : heroeRepositoryImpl
    ){}
    public async getHeroes(req: Request, res: Response):Promise<Response>{
        try{
            const heroes = await this.repository.get();
            return res.json(heroes);
        }catch(e){
            return res.json({'status':'ERROR', 'message': `${e}`});
        }
    }

    public async getHeroeById(req: Request, res: Response):Promise<Response>{
        try{
            const id = req.params.id;
            if(!id) return res.json({status: 'ERROR', message: 'ID is necesary for query'});
            const heroe = await this.repository.getById(id);
            return res.json(heroe);
        }catch(e){
            return res.json({'status':'ERROR', 'message': `${e}`});
 
        }

    }

    public async updateHeroe(req: Request, res: Response): Promise<Response>{
        try{
            const id = req.params.id;
            const body = req.body;
            if(!id) return res.status(400).json({'status':'ERROR', 'message': 'ID is necessary'});
            if(!body) return res.status(400).json({'status':'ERROR', 'message': 'Request is necessary'});
            const {name, createdAt} = body;
            if( isNaN( new Date(createdAt).getTime() ) ) throw new Error(`Date is invalid: YYYY-MM-DD. Received:  ${createdAt}`); 
            const heroe = await this.repository.update(new heroeEntity(uuid(), name, new Date(createdAt)),id);
            return res.json(heroe);
        }catch(e){
            return res.json({'status':'ERROR', 'message': `${e}`});
        }
    }

    public async createHeroe(req: Request, res: Response): Promise<Response>{
        try{
            const body = req.body;
            if( ! ( Object.entries(body)?.length ) ) return res.status(400).json({'status':'ERROR', 'message': 'Request is necessary'});
            const {name, createdAt = new Date()} = body;
            if( isNaN( new Date(createdAt).getTime() ) ) throw new Error(`Date is invalid: YYYY-MM-DD. Received:  ${createdAt}`); 
            const heroe = await this.repository.save(new heroeEntity(uuid(), name, new Date(createdAt) ));
            return res.json(heroe);
        }catch(e){
            return res.json({'status':'ERROR', 'message': `${e}`});
        }
    }

    public async deleteHeroe(req: Request, res: Response): Promise<Response>{
        try{
            const id = req.params.id;
            if(!id) return res.status(400).json({'status':'ERROR', 'message': 'ID is necessary'});
            const heroe = await this.repository.delete(id);
            return res.json(heroe);
        }catch(e){
            return res.json({'status':'ERROR', 'message': `${e}`});
        }
    }

    
}