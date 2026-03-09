import dotenv from "dotenv";
dotenv.config();

const config = {
   server: {
      port: parseInt(process.env.PORT ?? "3000", 10),
      nodeEnv: process.env.NODE_ENV ?? "development",
   },
   whatsapp: {
      sessionDataPath: process.env.SESSION_DATA_PATH ?? "./.wwebjs_auth",
   },
   rateLimit: {
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS ?? "60000", 10),
      max: parseInt(process.env.RATE_LIMIT_MAX ?? "20", 10),
   },
   logging: {
      level: process.env.LOG_LEVEL ?? "info",
   },
   cors: {
      allowedOrigins: (process.env.ALLOWED_ORIGINS ?? "*").split(","),
   },
} as const;

export default config;
