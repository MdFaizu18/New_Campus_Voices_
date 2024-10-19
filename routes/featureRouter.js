import express from 'express';
import { createFeature, deleteFeature, getFeature, updateFeature } from '../controllers/featureController.js';

const router = express.Router();

router.route('/').post(createFeature).get(getFeature);
router.route('/:id').patch(updateFeature).delete(deleteFeature);

export default router;