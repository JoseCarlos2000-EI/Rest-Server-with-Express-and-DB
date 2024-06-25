# REST API - MEMORY / POSTGRESQL

Pasos para poder levantar el proyecto:

1. Duplicar el archivo .env.template y renombrar como .env
2. Configurar las variables de entorno en base a la configuración
```
PORT = 


#POSTGRES
POSTGRES_PASSWORD = 
POSTGRES_USER = 
POSTGRES_DB = 
POSTGRES_URL = 
```

3. Levantar el motor de base de datos mediante docker
```
    docker compose up -d
```
4. Para acceder a las API se debe tener en cuenta que:

v1 -> Memoria
```
    {
        id: id generado por uuid,
        name: 'Spiderman',
        createdAt: new Date()
    },
    {
        id: id generado por uuid,
        name: 'Hulk',
        createdAt: new Date()
    },
    {
        id: id generado por uuid,
        name: 'Iron Man',
        createdAt: new Date()
    }
```
v2 -> Base de datos Postgres SQL