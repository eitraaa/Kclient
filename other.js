const { createHash } = require("crypto");

function hash(str) {
  return createHash('sha256').update(str).digest('hex');
}

module.exports = {
  hash,
}