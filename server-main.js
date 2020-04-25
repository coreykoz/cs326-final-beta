'use strict';
exports.__esModule = true;
var mongo_database_1 = require("./mongo-database");
var myserver_post_1 = require("./myserver-post");
var theDatabase = new mongo_database_1.Database('coreykoz1'); // CHANGE THIS
var theServer = new myserver_post_1.MyServer(theDatabase);
//theServer.listen(process.env.PORT);
theServer.listen(8080);
