/**
 * Database Configuration Object
 */
const dbconfig = {
    HOST: 'remotemysql.com',
    USER: 'YVVoXlsAdu',
    PASSWORD: 'jpzxzyMwp3',
    DB: 'YVVoXlsAdu',
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
module.exports = dbconfig;
