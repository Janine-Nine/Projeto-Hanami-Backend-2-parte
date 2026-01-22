import { Router } from 'express';
import { salesSummary, productAnalysis } from '../controllers/reportController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware);
router.get('/sales-summary', salesSummary);
router.get('/product-analysis', productAnalysis);

export default router;
