/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import proxy from 'express-http-proxy';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import axios from 'axios';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import rateLimit, { ipKeyGenerator } from "express-rate-limit";


const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  })
);

app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(morgan('dev'));

// API Rate Limiting


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,       // 15 minutes
  max: (req: any) => (req.user ? 1000 : 100),
  message: { error: "Too many requests, please try again later." },
  headers: true,
  legacyHeaders: true,
  keyGenerator: ipKeyGenerator,   // ✅ proper IPv4 + IPv6 support
});


app.use(limiter);
app.set("trust proxy", 1);

app.get('/gateway-health', (req, res) => {
  res.send({ message: 'Welcome to api-gateway!' });
});

const port = process.env.PORT || 3333;

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);


app.use("", proxy("http://localhost:6001"));