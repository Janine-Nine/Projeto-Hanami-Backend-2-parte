import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'node:path';
import fs from 'node:fs';
import { logger } from '../utils/logger.js';
import uploadRoutes from '../routes/uploadRoutes.js';
import reportRoutes from '../routes/reportRoutes.js';
import authRoutes from '../routes/authRoutes.js';
import { errorHandler } from '../middlewares/errorHandler.js';

dotenv.config();

// garantir diretórios necessários
try {
	const uploadsDir = path.resolve(process.cwd(), 'uploads');
	if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
	const logsDir = path.resolve(process.cwd(), 'logs');
	if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });
} catch (err) {
	logger.warn('Falha ao criar diretórios iniciais', { error: err?.message ?? err });
}

const app = express();
app.use(cors());
app.use(express.json());

const swaggerDocument = YAML.load(path.resolve(process.cwd(), 'docs', 'swagger.yaml'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/auth', authRoutes);
app.use('/upload', uploadRoutes);
app.use('/reports', reportRoutes);

app.use(errorHandler);

export default app;