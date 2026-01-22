import { parseCSV } from '../utils/csvParser.js';
import { processFile } from '../services/uploadService.js';
import fs from 'node:fs';
import { logger } from '../utils/logger.js';

export async function uploadFile(req, res, next) {
  try {
    const rows = await parseCSV(req);
    const result = await processFile(rows);
    // remove arquivo temporário se existir
    try {
      if (req.file && req.file.path) fs.unlinkSync(req.file.path);
    } catch (e) {
      logger.warn('Falha ao remover arquivo temporário', { error: e?.message ?? e });
    }

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}