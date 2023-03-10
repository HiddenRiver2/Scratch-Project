const { Pool } = require('pg');

const PG_URI: string = 'postgres://ocmnbnrh:aBfGp6YMVgZ_XKY2yFfr-zMg41NGQ8wp@mahmud.db.elephantsql.com/ocmnbnrh';

const pool = new Pool({
  connectionString: PG_URI,
});


module.exports = {
  query: (text: string, params: string, callback: Function) => {
    //is Function the correct typing for Callback?
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};