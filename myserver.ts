let http = require('http');
let url = require('url');
let express = require('express');

export class MyServer {

	private userinfo_db;
	private income_db;
	private expense_db;
	private trans_db;
	private monthly_db;

    // Server stuff: use express instead of http.createServer
    private server = express();
    private port = 8080;
	private router = express.Router();	

    constructor(db1, db2, db3, db4, db5) {
		this.userinfo_db = db1;
		this.income_db = db2;
		this.expense_db = db3;
		this.trans_db = db4;
		this.monthly_db = db5;

		// from https://enable-cors.org/server_expressjs.html
		this.router.use((request, response, next) => {
	   	 	response.header('Content-Type','application/json');
	    	response.header('Access-Control-Allow-Origin', '*');
	    	response.header('Access-Control-Allow-Headers', '*');
	    	next();
		});
		// Serve static pages from a particular path.
		this.server.use('/', express.static('./html'));
		// NEW: handle POST in JSON format
		this.server.use(express.json());

		// UWALLET HANDLERS

		// create/add
		this.router.post('/addUserInfo', this.addUserInfoHandler.bind(this));
		this.router.post('/addIncome', this.addIncomeHandler.bind(this));
		this.router.post('/addExpense', this.addExpenseHandler.bind(this));
		this.router.post('/addTransaction', this.addTransactionHandler.bind(this));
		this.router.post('/addMonthly', this.addMonthlyHandler.bind(this));

		// remove
		this.router.post('/removeMonthly', [this.monthlyErrorHandler.bind(this), this.removeMonthlyHandler.bind(this)]);

		// read
		this.router.post('/addUserInfo', this.addUserInfoHandler.bind(this));
		this.router.post('/addIncome', this.addIncomeHandler.bind(this));
		this.router.post('/addExpense', this.addExpenseHandler.bind(this));
		this.router.post('/addTransaction', this.addTransactionHandler.bind(this));
		this.router.post('/addMonthly', this.addMonthlyHandler.bind(this));

		
		// Set a fall-through handler if nothing matches.
		this.router.post('*', async (request, response) => {
		    response.send(JSON.stringify({ "result" : "command-not-found" }));
		});
		// Start up the counter endpoint at '/counter'.
		this.server.use('/uwallet', this.router);
	}
	
	
	// UWALLET HANDLER CODE

    private async monthlyErrorHandler(request, response, next) : Promise<void> {
		let value : boolean = await this.monthly_db.isFound(request.body.expense_name);
		if (!value) {
	    	response.write(JSON.stringify({'result' : 'error'}));
	    	response.end();
		} else {
	   	 next();
		}
	}
	
	private async addUserInfoHandler(request, response) : Promise<void> {
		let values = [request.body.name, request.body.email, request.body.age, request.body.password];
		await this.userinfo_db.put(name, "monthly_db");
		response.write(JSON.stringify({'result' : 'created',
				       'name' : name,
				       'value' : 0 }));
		response.end();
	}

	private async addIncomeHandler(request, response) : Promise<void> {
		let values = [request.body.income_name, request.body.income_total, request.body.date, request.body.category];
		console.log("creating counter named '" + name + "'");
		await this.income_db.put(values, "income_db");
		response.write(JSON.stringify({'result' : 'created',
				       'name' : name,
				       'value' : 0 }));
		response.end();
	}

	private async addExpenseHandler(request, response) : Promise<void> {
		let name = request.body.name;
		console.log("creating counter named '" + name + "'");
		await this.expense_db.put(name, 0);
		response.write(JSON.stringify({'result' : 'created',
				       'name' : name,
				       'value' : 0 }));
		response.end();
	}

	private async addTransactionHandler(request, response) : Promise<void> {
		let name = request.body.name;
		console.log("creating counter named '" + name + "'");
		await this.trans_db.put(name, 0);
		response.write(JSON.stringify({'result' : 'created',
				       'name' : name,
				       'value' : 0 }));
		response.end();
	}

	private async addMonthlyHandler(request, response) : Promise<void> {
		let name = request.body.name;
		console.log("creating counter named '" + name + "'");
		await this.monthly_db.put(name, 0);
		response.write(JSON.stringify({'result' : 'created',
				       'name' : name,
				       'value' : 0 }));
		response.end();
	}

	private async removeMonthlyHandler(request, response) : Promise<void> {
		let name = request.body.name;
		await this.monthly_db.del(name);
		response.write(JSON.stringify({'result' : 'deleted',
				       'value'  : name }));
		response.end();
	}
}

