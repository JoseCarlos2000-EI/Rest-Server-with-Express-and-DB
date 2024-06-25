import { prisma } from "../../data/posgress/postgress";
import { heroeDatasource } from "../../domain/datasources/heroe.datasource";
import { heroeEntity } from "../../domain/entities/heroe.entity";


export class heroePostgressDatasource implements heroeDatasource{
    private jsonHeroe = (entity : heroeEntity) => {
        const info = Object.entries(entity);
        return info.filter(k => k[1] && k[0] != 'id').reduce((obj, item) => {
            obj[item[0]] = item[1];
            return obj;
        },{} as any) 
    };

    public async save(entity: heroeEntity): Promise<heroeEntity> {
        const { name } = entity;
        const heroe = await prisma.heroe.create({
            data: this.jsonHeroe(entity),
        });
        if(!heroe) throw new Error(`Se generó un error al guardar el heroe: ${name}. Contactarse con TI`);
        return new heroeEntity(heroe.id, heroe.name, heroe.createdAt);
    }

    public async get(): Promise<heroeEntity[]> {
        const info = await prisma.heroe.findMany();
        return info.map(heroe => new heroeEntity(heroe.id, heroe.name, heroe.createdAt));
    }

    public async getById(id: number | string): Promise<heroeEntity> {
        id = +id;
        if(isNaN(id)) throw new Error("Number is invalid...");
        const info = await prisma.heroe.findFirst({
                where:{
                    id: id
                }
            });
        if(!info) throw new Error (`Heroe with id: ${id} not exists`);
        const {id: idHeroe, name, createdAt} = info;

        return new heroeEntity(idHeroe, name, createdAt);
    }

    public async update(entity: heroeEntity, id: number | string): Promise<heroeEntity> {
        id = +id;
        if(isNaN(id)) throw new Error(`Number is invalid...`);
        const heroe = await prisma.heroe.update({
            where:{
                id: id
            },
            data: this.jsonHeroe(entity)
        });
        if(!heroe) throw new Error(`Se generó un error al guardar el heroe: ${entity.name}. Contactarse con TI`);
        return new heroeEntity(heroe.id, heroe.name, heroe.createdAt);
    }

    public async delete(id: number | string): Promise<heroeEntity> {
        id = +id;
        if(isNaN(id)) throw new Error("Number is invalid...");

        const heroe = await prisma.heroe.findFirst({
            where: {id: id}
        });

        if(!heroe) throw new Error (`Heroe with id: ${id} not exists`);

        const info = await prisma.heroe.delete({
            where:{
                id: +id
            }
        });

        const { name, createdAt } = info;

        return new heroeEntity(id, name, createdAt);

    }
    
}