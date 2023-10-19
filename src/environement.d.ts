declare namespace NodeJS {
    interface ProcessEnv{
        PORT: string;
        DBNAME: string;
        MONGO_URI: string;
    }
}