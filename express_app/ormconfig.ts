export default {
    "type": process.env.TYPEORM_CONNECTION,
    "host": process.env.TYPEORM_HOST,
    "port": process.env.TYPEORM_PORT,
    "username": process.env.TYPEORM_USERNAME,
    "password": process.env.TYPEORM_PASSWORD,
    "database": process.env.TYPEORM_DATABASE,
    "synchronize": process.env.TYPEORM_SYNCHRONIZE,
    "entities": ["src/entities/**/*.ts"],
    "migrations": ["src/database/migrations/**/*.ts"],
    "subscribers": ["src/subscribers/**/*.ts"],
    "cli": {
    "entitiesDir": "src/entities",
        "migrationsDir": "src/database/migrations",
        "subscribersDir": "src/subscribers"
}

}
