import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

export function setupServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(pino());

  // JSON parser
  app.use(express.json());

  // Routes (поки немає, додамо пізніше)

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  // Run server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
