import {BaseServiceWorker} from 'eris-fleet';
import pkg from 'pg';
const {Client, types} = pkg;
import {Postgrelogin} from '../static/config.mjs'

const pgclient = new Client(Postgrelogin);
types.setTypeParser(1700, 'text', parseFloat);
pgclient.connect(err => console.log(`postgres connected and ready`))

export class ServiceWorker extends BaseServiceWorker {
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