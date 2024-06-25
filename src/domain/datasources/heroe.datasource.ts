import { heroeEntity } from "../entities/heroe.entity";

export abstract class heroeDatasource{
    public abstract save(entity: heroeEntity): Promise<heroeEntity>;
    public abstract get(): Promise<heroeEntity[]>;
    public abstract getById(id: number | string): Promise<heroeEntity>;
    public abstract update(entity: heroeEntity, id: number | string): Promise<heroeEntity>;
    public abstract delete(id: number | string): Promise<heroeEntity>;
}