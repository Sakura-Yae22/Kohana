const {BaseServiceWorker} = require('eris-fleet'), {Client: PG, types} = require('pg');

const {Postgrelogin} = require('../index')
const pgclient = new PG(Postgrelogin);
types.setTypeParser(1700, 'text', parseFloat);
pgclient.connect(err => console.log(`postgres connected and ready`))

module.exports = class ServiceWorker extends BaseServiceWorker {
    constructor(setup) {
        super(setup);
        this.serviceReady();
    }

    async handleCommand(statement) {
        return new Promise((resolve, reject) => {
            pgclient.query(statement, (err, res) => {
                if (err) reject(err);
                resolve(res.rows);
            });
        })
    }

    async shutdown(done) {
        await pgclient.end()
        done();
    }
}