import csv from 'csv-parser';
import fs from 'node:fs';
import { logger } from './logger.js';

export function parseCSV(req) {
  return new Promise((resolve, reject) => {
    const results = [];
    if (!req.file || !req.file.path) {
      logger.warn('parseCSV chamado sem arquivo');
      return resolve([]);
    }

    const stream = fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', data => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (err) => {
        logger.error('Erro ao ler/parsar CSV', { error: err?.message ?? err });
        reject(err);
      });
    // in case the stream errors synchronously
    stream.on && stream.on('error', (err) => {
      logger.error('Stream error parseCSV', { error: err?.message ?? err });
      reject(err);
    });
  });
}