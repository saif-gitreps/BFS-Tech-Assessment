import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import config from "./config.js";
import path from "path";
import http from "http";
import { handleError, handleNotFound } from "./middlewares/error.middleware.js";
import logger from "./utils/logger.js";

const app = express();
const httpServer = http.createServer(app);

app.use(helmet());
app.use(cors({ origin: config.cors.allowedOrigins }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/server-status", (_req: Request, res: Response) => {
   res.json({ success: true, message: "Server is running", uptime: process.uptime() });
});

app.use(handleNotFound);
app.use(handleError);

httpServer.listen(config.server.port, () => {
   logger.info(`server running on http://localhost:${config.server.port}`);
   logger.info(`   environment : ${config.server.nodeEnv}`);
   logger.info(`   socket.IO   : enabled`);
});
