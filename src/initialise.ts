import {createConnection, Connection} from 'typeorm';
require( 'dotenv' ).config();

async function creatingDatabase(){
    const connection = await createConnection({
        type: 'mysql',
        host: process.env.HOST,
        port: parseInt(process.env.PORT, 10),
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
    });

    console.log(connection);
    connection.close();
}

createConnection();

process.exit();