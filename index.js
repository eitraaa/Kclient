const { startServer } = require("./server.js");
const testmsg = process.env['test']
const { hash } = require("./other.js");
startServer(3000);
console.log(testmsg, hash());