import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

const config:MysqlConnectionOptions = {
    type:'mysql',
    database:'movie_db',
    port:3307,
      host: 'localhost',
      username: 'chiemerie',
      password: 'mauFJcuf5dhRMQrjj',
    entities:['dist/src/**/*.entity.js'],
    synchronize:false,
    migrations: [
        'dist/src/db/migrations/*.js'
    ],
    cli: {
        migrationsDir: 'src/db/migrations'
    }
}

export default config
