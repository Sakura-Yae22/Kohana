# How to setup
1. Download this repo
2. Download [node.js](https://nodejs.org/en/download/)
3. Download [PostgreSQL](https://www.postgresql.org/download/)
4. Edit `config.json`
    1. Put your bot token in `botToken`
    2. Add your PostgreSQL database login details. Change the `user`, `database`, `password`, `host`, and `port` values to match your database
5. Run `npm i` in this repos directory
6. Now you can start the bot by running `node ./index.js` or if you choose to use pm2 `pm2 start ./index.js --name bump-reminder`

# Todo
1. Make the bot auto setup the database
