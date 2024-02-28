const { startServer } = require("./server.js");
const testmsg = process.env['test']
startServer(3000);

console.log(testmsg);