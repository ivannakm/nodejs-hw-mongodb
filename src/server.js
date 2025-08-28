import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { getEnvVar } from './utils/getEnvVar.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';

const PORT = Number(getEnvVar('PORT', '3000'));

export function setupServer() {
  const app = express();

  // JSON parser
  app.use(express.json());

  app.use(cors());
  app.use(cookieParser());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  // Routes
  app.get('/', (req, res) => {
    res.json({
      message: 'Hello World!',
    });
  });

  app.use(router);

  // 404 handler
  app.use('/*splat', notFoundHandler);

  // Error handler
  app.use(errorHandler);

  // Run server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
