let http = require('http');
let url = require('url');
let express = require('express');

export class MyServer {

    private theDatabase;

    // Server stuff: use express instead of http.createServer
    private server = express();
    private port = 8080;
	private router = express.Router();	

    constructor(db) {
	this.theDatabase = db;
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


	// Set a single handler for a route.
	this.router.post('/users/:userId/create', this.createHandler.bind(this));
	// Set multiple handlers for a route, in sequence.
	this.router.post('/users/:userId/read',   [this.errorHandler.bind(this), this.readHandler.bind(this) ]);
	this.router.post('/users/:userId/update', [this.errorHandler.bind(this), this.updateHandler.bind(this)]);
	this.router.post('/users/:userId/delete', [this.errorHandler.bind(this), this.deleteHandler.bind(this)]);
	// Set a fall-through handler if nothing matches.

	this.router.post('/createIncome', this.createIncomeHandler.bind(this));
	this.router.post('/createExpense', this.createExpenseHandler.bind(this));
	this.router.post('/createTransaction', this.createTransactionHandler.bind(this));

	this.router.post('/read', this.readHandler.bind(this));

	this.router.post('/updateMonthly', this.updateMonthlyHandler.bind(this));

	this.router.post('/deleteMonthly', this.deleteMonthlyHandler.bind(this));

	this.router.post('*', async (request, response) => {
	    response.send(JSON.stringify({ "result" : "command-not-found" }));
	});
	// Start up the counter endpoint at '/counter'.
	this.server.use('/uwallet', this.router);
	}
	
	//id: string, total: string, date: string, category: string, type: string, name: string
	

	//CREATES
	private async createIncomeHandler(request, response){
		await this.theDatabase.put(request.body.income_name, request.body.income_total, request.body.date, request.body.category, "unused", request.body.id);
		response.write(JSON.stringify({'result' : 'created',
					       'income_name' : request.body.income_name,
					       'value' : 0 }));
		response.end();
	}

	private async createExpenseHandler(request, response){
		await this.theDatabase.put(request.body.expense_name, request.body.expense_total, request.body.date, request.body.category, "unused", request.body.id);
		response.write(JSON.stringify({'result' : 'created',
					       'expense_name' : request.body.expense_name,
					       'value' : 0 }));
		response.end();
	}

	private async createTransactionHandler(request, response){
		let name = request.body.trans_name;
		console.log("testing transaction handler:'" + name + "'");
		
		await this.theDatabase.put(request.body.trans_name, request.body.trans_price, request.body.trans_category, request.body.trans_date, request.body.trans_type, request.body.id);
		response.write(JSON.stringify({'result' : 'created',
					       'income_name' : name,
					       'value' : 0 }));
		response.end();
	}

	//READ
	private async readHandler(request, response){
		let list = await this.theDatabase.get(request.body.id);
		response.write(JSON.stringify(list));
		response.end();
	}

	//UPDATES
	private async updateMonthlyHandler(request, response){
		await this.theDatabase.put(request.body.monthly_expense, request.body.monthly_cost, "unused", "unused", "unused", request.body.id);
		response.write(JSON.stringify({'result' : 'updated',
				       'name' : request.body.monthly_expense,
				       'value' : request.body.monthly_cost }));
		response.end();
	}

	//DELETES
	private async deleteMonthlyHandler(request, response){
		await this.theDatabase.del(request.body.expense_name, request.body.id);
		response.write(JSON.stringify({'result' : 'deleted',
					       'value'  : request.body.expense_name }));
		response.end();
	}
	

    private async errorHandler(request, response, next) : Promise<void> {
	let value : boolean = await this.theDatabase.isFound(request.params['userId']+"-"+request.query.name);
//	console.log("result from database.isFound: " + JSON.stringify(value));
	if (!value) {
	    response.write(JSON.stringify({'result' : 'error'}));
	    response.end();
	} else {
	    next();
	}
    }
    
    private async createHandler(request, response) : Promise<void> {
	await this.createCounter(request.params['userId']+"-"+request.query.name, response);
    }

	/*
    private async readHandler(request, response): Promise<void> {
	console.log(request.params['userId']);
	await this.readCounter(request.params['userId']+"-"+request.body.name, response);
    }*/

    private async updateHandler(request, response) : Promise<void> {
	await this.updateCounter(request.params['userId']+"-"+request.body.name, request.body.value, response);
    }

    private async deleteHandler(request, response) : Promise<void> {
	await this.deleteCounter(request.params['userId']+"-"+request.query.name, response);
    }

    public listen(port) : void  {
	this.server.listen(port);
    }

    public async createCounter(name: string, response) : Promise<void> {
	console.log("creating counter named '" + name + "'");
	await this.theDatabase.put(name, 0);
	response.write(JSON.stringify({'result' : 'created',
				       'name' : name,
				       'value' : 0 }));
	response.end();
    }

    public async errorCounter(name: string, response) : Promise<void> {
	response.write(JSON.stringify({'result': 'error'}));
	response.end();
    }

    public async readCounter(name: string, response) : Promise<void> {
	let value = await this.theDatabase.get(name);
	response.write(JSON.stringify({'result' : 'read',
				       'name' : name,
				       'value' : value }));
	response.end();
    }

    public async updateCounter(name: string, value: number, response) : Promise<void> {
	await this.theDatabase.put(name, value);
	response.write(JSON.stringify({'result' : 'updated',
				       'name' : name,
				       'value' : value }));
	response.end();
    }
    
    public async deleteCounter(name : string, response) : Promise<void> {
	await this.theDatabase.del(name);
	response.write(JSON.stringify({'result' : 'deleted',
				       'value'  : name }));
	response.end();
    }
}
