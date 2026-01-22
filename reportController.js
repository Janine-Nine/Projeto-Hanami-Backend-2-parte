import { getSalesSummary, getProductAnalysis } from '../services/reportService.js';

export async function salesSummary(req, res) {
  res.json(await getSalesSummary());
}

export async function productAnalysis(req, res) {
  res.json(await getProductAnalysis());
}
