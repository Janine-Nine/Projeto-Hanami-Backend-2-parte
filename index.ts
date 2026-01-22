import { Router } from 'express'
import reportsRoutes from '../modules/reports/reports.routes'

const router = Router()

router.use('/reports', reportsRoutes)

export default router
