const {
  EventEmitter
} = require('events');
class State extends EventEmitter {
  constructor() {
    super();
    this.state = {}
  }

  /**
   * @param {String} id Discord user id
   */
  _timer(id) {
    const user = this.state[id];
    if (user.timer) clearTimeout(user.timer);
    if (!user.images.length) return;
    user.timer = setTimeout(() => this.emit('post', {
      id,
      user
    }), 30000);
  }

  /**
   * @param {ArrayBuffer} image Byte array of the image
   * @param {Object} user id and username of a Discord user
   */
  addToUser(media_id, message_id, {
    id,
    username
  }) {
    // Initializes an object if the user doesn't exist in state yet.
    if (!this.state[id]) this.state[id] = {
      images: [],
      timer: null,
      username
    };
    this.state[id].images.push({
      media_id,
      message_id
    });

    if (this.state[id].images.length > 3) {
      return this.emit('post', {
        id,
        user: this.state[id]
      });
    }

    this._timer(id);
    return this.state[id];
  }

  resetUser(id) {
    if (this.state[id]) delete this.state[id];
  }

  /**
   * @param {String} id Discord user id
   */
  userIsFull(id) {
    if (!this.state[id]) return false;
    return this.state[id].images.length === 4
  }
}

module.exports = State;