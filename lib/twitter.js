const State = require('./state');
const axios = require('axios');
const Client = require('twitter');
require('dotenv').config();

class Twitter extends State {
  constructor() {
    super();
    this.on('post', this._post);
    this.client = new Client({
      consumer_key: '', //Twitter API key
      consumer_secret: '', //Twitter API secret key
      access_token_key: '', // Twitter Access token
      access_token_secret: '' //Twitter access token secret
    });
  }

  async _post({
    id,
    user
  }) {
    console.log(`Posting ${user.images.length} images from ${user.username}`);
    const mediaIds = user.images.map(img => img.media_id).join();
    console.log('ids', mediaIds);
    this.resetUser(id);

    await this.client.post('statuses/update', {
      status: user.username + " posted",
      media_ids: mediaIds,
    });

  }

  async addImage(imageUrl, messageId, user) {
    const image = await axios.get(imageUrl, {
      responseType: 'arraybuffer'
    }); // Binary Buffer
    const media = await this.client.post('media/upload', {
      media: image.data
    }).catch(err => err);
    this.addToUser(media.media_id_string, messageId, user);
    console.log(`Added image from ${user.username}`);
  }

  async deleteImage(messageId, user) {
    if (!this.state[user.id]) return;
    const {
      images
    } = this.state[user.id];
    this.state[user.id].images = images.filter(img => img.message_id !== messageId);
    this._timer(user.id);
    console.log(`Removed image from ${user.username}`);
  }
}

module.exports = Twitter;