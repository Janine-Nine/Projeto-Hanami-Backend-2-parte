import { Router } from 'express'
import { salesSummary } from './reports.controller'

const router = Router()

router.get('/sales-summary', salesSummary)

export default router
