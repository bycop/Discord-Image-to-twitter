# Discord-Image-to-twitter
A simple bot allows you to post image to a discord channel and automatic repost to a discord twitter.

# Installation
- Make "npm install" command after cloning the repo.
- You need to change the token at the bottom of app.js
- In the twitter.js file you need to put your twitter application Key ( https://developer.twitter.com/en/apps )
```javascript
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
```
- On app.js line 4, change the channel ID were the image will be take
```javascript
const channeltweet = ""; //Channel ID
```
- Finally, you can change the message posted with the image on the line 28 of twitter.js 
```javascript
status: user.username + " posted",
```

## Others Bots

Discord-global-chat : https://github.com/bycop/Discord-global-chat <br>
Discord-Fivem-Playerlist : https://github.com/bycop/Discord-Fivem-Playerlist <br>
Discord-Serverlist-InviteLinkByID : https://github.com/bycop/Discord-Serverlist-InviteLinkByID
