import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import dotenv from 'dotenv';
import apiRouter from './routes/api';

dotenv.config();

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3100',
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

const vercelOriginPattern = /^https:\/\/[\w-]+\.vercel\.app$/;

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        vercelOriginPattern.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.get('/', (_req, res) => {
  const frontendUrl = process.env.FRONTEND_URL;
  if (frontendUrl) return res.redirect(frontendUrl);
  res.json({ message: 'API Server - available routes under /api', health: true });
});

app.use('/api', apiRouter);

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

export default app;
