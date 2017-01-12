const {resolve} = require("path");
const utilities = require(resolve(__dirname, "..", "tools", "utilities"));

const obj = utilities.readyConfig("/project/portal_web/configuration.json");

console.log(obj);
