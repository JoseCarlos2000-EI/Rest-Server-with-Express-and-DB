import { heroeDatasource } from "../../domain/datasources/heroe.datasource";
import { heroeEntity } from "../../domain/entities/heroe.entity";
import { uuid } from "../../config/plugins/uuid.plugin";
import { heroes } from "../../data/memory/memory.data";


export class heroeMemoryDataSource implements heroeDatasource {
    public async save(entity: heroeEntity): Promise<heroeEntity> {
        const { name, createdAt = new Date() } = entity;
        const newHeroe = new heroeEntity(uuid(),name, createdAt);
        heroes.push(newHeroe);
        return newHeroe;
    }
    public async get(): Promise<heroeEntity[]> {
        const heroes_data = heroes.map(heroe => new heroeEntity(heroe.id, heroe.name, heroe.createdAt));
        return heroes_data;
    }
    public async getById(id: number | string): Promise<heroeEntity> {
        const heroe = heroes.find(heroe => heroe.id === id);
        if(!heroe) throw new Error(`Heroe with id : ${id} not found`);
        const { id: idHeroe, name, createdAt } = heroe;
        return new heroeEntity(idHeroe, name, createdAt);
    }
    public async update(entity: heroeEntity, id: number | string): Promise<heroeEntity> {
        const {name, createdAt } = entity;
        const data = heroes.find(heroe => heroe.id === id);
        if(!data) throw new Error(`Hero with id : ${id} not found`);
        data['name'] = name === null ? null: ( name ?? data['name']);
        data['createdAt'] = createdAt === null ? null: ( createdAt ?? data['createdAt']);       
        return new heroeEntity(id, data['name'], data['createdAt']);
    }
    public async delete(id: number | string): Promise<heroeEntity> {
        const heroe = heroes.find(heroe => heroe.id === id);
        if( !heroe ) throw new Error(`Heroe with id : ${id} not found`);
        const {id: idHeroe, name, createdAt} = heroe;
        heroes.splice(heroes.indexOf(heroe), 1);
        return new heroeEntity(idHeroe, name, createdAt);
        
    }
}