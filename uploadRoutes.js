import { Router } from 'express';
import multer from 'multer';
import { uploadFile } from '../controllers/uploadController.js';

const upload = multer({ dest: 'uploads/' });
const router = Router();

router.post('/', upload.single('file'), uploadFile);

export default router;