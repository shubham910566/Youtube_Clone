import express from 'express';
import {
  createChannel,
  getChannelByUserId,
    getChannelById,
  
} from '../controllers/channelController.js';

const router = express.Router();

router.post('/', createChannel);
router.get('/by-user/:userId', getChannelByUserId);
router.get('/:id', getChannelById);

export default router;
