import pkg from 'pg';
const {Client, types} = pkg;
import {Postgrelogin} from '../static/config.mjs'

const pgclient = new Client(Postgrelogin);
types.setTypeParser(1700, 'text', parseFloat);
pgclient.connect(err => console.log(`postgres connected and ready`))

export const query = async (statement)=>{
    const res = await pgclient.query(statement);
    return res.rows;
}