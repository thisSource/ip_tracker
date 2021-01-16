const express = require("express");
const app = express();
const router = express.Router();
const geoip = require("geoip-lite");
const expressip = require("express-ip");
const Datastore = require("nedb");

app.use(express.json());
app.use(expressip().getIpInfoMiddleware);
app.use(express.static("public"));

//create database
const db = new Datastore("database.db");
db.loadDatabase();

// let ip = "83.249.2.189"
// let geo = geoip.lookup(ip)
// console.log(geo)

app.get("/api", (req, res) => {
  let ipLookedUp = geoip.lookup(req.ipInfo.ip);
//   let ipLookedUp = geoip.lookup("83.249.2.189")
  const timestamp = Date.now();
  db.insert({
    ip: req.ipInfo.ip,
    location: ipLookedUp.city,
    LatLong: ipLookedUp.ll,
    LoggedAt: timestamp
  });

  res.send([{ ip: req.ipInfo }, { lookUp: ipLookedUp }]);
});

app.get("/database", (req, res) => {
  db.find({}, (err, data) => {
    res.send(data);
  });
});

app.use("/api", router);

app.listen(process.env.PORT || 5000, () => {
  console.log(`listening on port 5000`);
});
