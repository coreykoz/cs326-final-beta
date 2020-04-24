'use strict';

import { Database } from './mongo-database';
import { MyServer } from './myserver-post';

const theDatabase = new Database('dhruvivora'); // CHANGE THIS
const theServer = new MyServer(theDatabase);

theServer.listen(process.env.PORT);
