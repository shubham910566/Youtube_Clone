import Channel from '../models/Channels.Model.js';

// Create a channel
export const createChannel = async (req, res) => {
  try {
    const { channelName, description, channelBanner, owner } = req.body;

    const existing = await Channel.findOne({ owner });
    if (existing) {
      return res.status(400).json({ message: 'User already has a channel' });
    }

    const newChannel = new Channel({
      channelName,
      description,
      channelBanner,
      owner
    });

    await newChannel.save();
    res.status(201).json(newChannel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get channel by user ID
export const getChannelByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const channel = await Channel.findOne({ owner: userId });
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }
    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get channel by channel ID
export const getChannelById = async (req, res) => {
  try {
    const { id } = req.params;
    const channel = await Channel.findById(id);
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }
    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
