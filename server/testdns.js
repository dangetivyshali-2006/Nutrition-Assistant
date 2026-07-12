const dns = require("dns");

dns.setServers([
  "1.1.1.1",
  "8.8.8.8"
]);


dns.promises.resolveSrv(
  "_mongodb._tcp.cluster0.wsfqqds.mongodb.net"
)
.then(console.log)
.catch(console.error);