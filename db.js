const { dbuser, dbpass, dburl } = process.env
const { hash } = require("./other.js");
const { Pool } = require("pg")
const db = new Pool({
  user: dbuser,
  host: dburl,
  database: dbuser,
  password: dbpassword,
  port: 5432,
});


