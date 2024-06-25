import express from 'express';
import { venv } from '../config/plugins/env-var.plugin';
import { AppRoutes } from './routes';

export class server {
    public static start(){
        const server = express();
        server.use(express.json())
        server.use('/api', AppRoutes.routes())
        server.listen(venv.PORT,() => {
            console.log(`Server starting in PORT: ${venv.PORT}`);
        });
    }
}