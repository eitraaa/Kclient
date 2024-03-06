const { createHash, getRandomValues, randomBytes } = require("crypto");

function hash(str) {
  if (str != null) {
    return createHash('sha256').update(str).digest('hex');
  } else {
    return createHash('sha256').update(randomBytes(32)).digest('hex');
  }
}

module.exports = {
  hash,
}