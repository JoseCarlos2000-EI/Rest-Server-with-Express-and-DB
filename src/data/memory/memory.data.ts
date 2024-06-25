import { uuid } from "../../config/plugins/uuid.plugin";

interface heroeMemoryInter {
    id : string | number,
    name : string | null,
    createdAt : Date | null,
}
export const heroes : heroeMemoryInter[] = [
    {
        id: uuid(),
        name: 'Spiderman',
        createdAt: new Date()
    },
    {
        id: uuid(),
        name: 'Hulk',
        createdAt: new Date()
    },
    {
        id: uuid(),
        name: 'Iron Man',
        createdAt: new Date()
    }
];