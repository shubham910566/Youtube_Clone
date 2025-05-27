import express from 'express';
import {
  createChannel,
  getChannelByUserId,
    getChannelById,
  
} from '../controllers/channelController.js';
function channelRoutes(app) {
app.post('/channel/', createChannel);
app.get('/channel/by-user/:userId', getChannelByUserId);
app.get('/channel/:id', getChannelById);
}


export default channelRoutes
