declare global {
    interface ProcessEnv {
        PORT: string;
        IP: string;
        MONGO_URL: string;
        JWT_SECRET: string;
        JWT_LIFETIME: string;
        NODE_ENV: "development" | "production";
    }
}

export {};
