module.exports.OwM = require("./lib/OwM");
module.exports.Queue = require("./lib/Queue");
const uidGenerator = require("./lib/uidGenerator").createUidGenerator(200, 32);

module.exports.uidGenerator = uidGenerator;
module.exports.generateUid = uidGenerator.generateUid;
module.exports.combos = require("./lib/Combos");
