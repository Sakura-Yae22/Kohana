# how to setup
1. download this repo
2. download [node.js](https://nodejs.org/en/download/)
3. download [postgresql](https://www.postgresql.org/download/)
4. edit config.json
    1. put your bot token in `botToken`
    2. add your PostgreSQL database login details. cange the `user`, `database`, `password`, `host`, and `port` propertys to mach your database
5. run `npm i` in this repos directory
6. now you can start the bot by running `node ./index.js` or if you choese to use pm2 `pm2 start ./index.js --name bump-reminder`

# Todo
1. make the bot auto setup the database
