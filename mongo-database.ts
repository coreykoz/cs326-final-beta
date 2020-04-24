export class Database {

    private MongoClient = require('mongodb').MongoClient;
    private uri = "mongodb+srv://guest:guest@cluster0-y0tyl.mongodb.net/test?retryWrites=true&w=majority";
    private client;
    private collectionName : string;
    private dbName : string = "emery";

    constructor(collectionName) {
	this.collectionName = collectionName;
	this.client = new this.MongoClient(this.uri, { useNewUrlParser: true });
	// Open up a connection to the client.
	// Open up a connection to the client.
	// The connection is asynchronous, but we can't call await directly
	// in the constructor, which cannot be async. So, we use "IIFE". Explanation below.
	
	/* from https://anthonychu.ca/post/async-await-typescript-nodejs/

	  Async/Await and the Async IIFE

	  The await keyword can only be used inside of a function
	  marked with the async keyword. [...] One way to do this is
	  with an "async IIFE" (immediately invoked function
	  expression)...

	   (async () => {
	   // code goes here
	   })();

	*/
	(async () => {
	    await this.client.connect().catch(err => { console.log(err); });
	})();
    }
	
    public async put(name: string, total: string, date: string, category: string, type: string, id: string) : Promise<void> {
	let db = this.client.db(this.dbName);
	let collection = db.collection(this.collectionName);
	
	console.log("id is:" + id);
	switch(id){
		case "transaction":
			var result = await collection.updateOne({'trans_name' : name, 'trans_type': type, 'trans_category': category, 'trans_date': date, 'trans_price': total, 'id': id}, { $set : { 'trans_price' : total} }, { 'upsert' : true });
			break;
		case "expense":
			var result = await collection.updateOne({'expense_name': name, 'expense_total': total, 'date': date, 'category': category, 'id': id},{ $set : { 'expense_total' : total} }, { 'upsert' : true });
			break;
		case "income":
			var result = await collection.updateOne({'income_name': name, 'income_total': total, 'date': date, 'category': category,  'id': id}, { $set : { 'income_total' : total} }, { 'upsert' : true });
			break;
		case "userInfo":
			break;
		case "monthly":
			var result = await collection.updateOne({'monthly_expense': name, 'id': id}, { $set : { 'monthly_cost' : total} }, { 'upsert' : true });
			break;
	}
	
    }

    public async get(id: string) : Promise<string> {
		let db = this.client.db(this.dbName); // this.level(this.dbFile);
		let collection = db.collection(this.collectionName);
		let result = await collection.find({'id': id}).toArray();
		if (result) {
		    return result;
		} else {
		    return null;
		}
    }
    
    public async del(name: string, id: string) : Promise<void> {
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collectionName);
		console.log("delete: key = " + name);

		switch(id){
			case "monthly":
				var result = await collection.deleteOne({'monthly_expense' : name});
				console.log("entered monthly delete");
				break;
			case "transaction":
				var result = await collection.deleteOne({'trans_name' : name});
				break;
				
		}
		
    }
    
    public async isFound(key: string) : Promise<boolean>  {
	console.log("isFound: key = " + key);
	let v = await this.get(key);
	console.log("is found result = " + v);
	if (v === null) {
	    return false;
	} else {
	    return true;
	}
    }
}
