declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PRIVATE_SECRET: string;
      DATABASE_URL: string;
    }
  }
}

export type { };
