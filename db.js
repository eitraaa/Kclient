const { dbuser, dbpass, dburl } = process.env
const { hash } = require("./other.js");
const { Pool } = require("pg")
const db = new Pool({
  user: dbuser,
  host: dburl,
  database: dbuser,
  password: dbpass,
  port: 5432,
});

async function login(userid, password) {
  const query = 'SELECT id, password FROM userlist WHERE id = $1 AND password = $2';
  try {
    const auth = await db.query(query, [userid, hash(password)]);
    if (auth.rows.length > 0) {
      const newQuery = 'UPDATE userlist SET loginid = $1 WHERE id = $2'
      const loginid = hash();
      await db.query(newQuery, [loginid, userid]);
      return {"auth": true, "loginid": loginid, "id": userid};
    }
    return {"auth": false};
  } catch (error) {
    return {"auth": false};
  }
}


async function authCheck(id, loginid) {
  try {
    const query = 'SELECT id, loginid FROM userlist WHERE id = $1';
    const authCheckResult = await db.query(query, [id]);
    if (authCheckResult.rows.length > 0) {
      const idCheck = authCheckResult.rows[0].id;
      const loginidCheck = authCheckResult.rows[0].loginid;
      if (idCheck == id && loginidCheck == loginid) {
        return true;
      } else {
        return false;
      }
    } else {
      return false; 
    }
  } catch (error) {
    console.error('データベースエラー:', error.message);
    return false; 
  }
}


function logout(id, loginid) {
  const query = 'SELECT id, loginid FROM userlist WHERE id = $1';
  const getData = db.query(query, [id]);
  if (getData.rows.length > 0) {
    if (getData.rows[0].id == id && getData.rows[0].loginid == loginid) {
      const newQuery = 'UPDATE userlist SET loginid = -1 WHERE id = $1';
      db.query(newQuery);
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
} 
module.exports = {
  login, logout, authCheck
}
