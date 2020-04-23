'use strict';

import { Database } from './mongo-database';
import { MyServer } from './myserver';

const userinfo_db = new Database('userinfo_db');
const income_db = new Database('income_db');
const expense_db = new Database('expense_db');
const trans_db = new Database('trans_db');
const monthly_db = new Database('monthly_db');

const theServer = new MyServer(userinfo_db, income_db, expense_db, trans_db, monthly_db);

theServer.listen(8080);
