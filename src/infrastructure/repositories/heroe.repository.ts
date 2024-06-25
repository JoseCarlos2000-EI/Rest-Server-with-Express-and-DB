import { heroeEntity } from "../../domain/entities/heroe.entity";
import { heroeRepository } from "../../domain/repositories/heroe.repository";
import { heroeDatasource } from "../../domain/datasources/heroe.datasource";

export class heroeRepositoryImpl implements heroeRepository {
    constructor(
        private datasource: heroeDatasource
    ){}
    public async save(entity: heroeEntity): Promise<heroeEntity> {
        return await this.datasource.save(entity);
    }
    public async get(): Promise<heroeEntity[]> {
        return await this.datasource.get();
    }
    public async getById(id: number | string): Promise<heroeEntity> {
        return await this.datasource.getById(id);
    }
    public async update(entity: heroeEntity, id: number | string): Promise<heroeEntity> {
        return await this.datasource.update(entity, id);
    }
    public async delete(id: number | string): Promise<heroeEntity> {
        return await this.datasource.delete(id);
    }

   
}