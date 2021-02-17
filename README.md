# how to setup
1. download this repo
2. download [node.js](https://nodejs.org/en/download/)
3. edit config.json
    1. put your bot token in `botToken`
    2. add your PostgreSQL database login details. cange the `user`, `database`, `password`, `host`, and `port` propertys to mach your database
4. run `npm i` in this repos directory
5. now you can start the bot by running `node ./index.js` or if you choese to use pm2 `pm2 start ./index.js --name bump-reminder`