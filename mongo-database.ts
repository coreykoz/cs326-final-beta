export class Database {

    private MongoClient = require('mongodb').MongoClient;
    private uri = "mongodb+srv://the_kid:aaaTWTG86v2Y8dR@cluster0-8k4wy.mongodb.net/test?retryWrites=true&w=majority";
    private client;
    private collectionName : string;
    private dbName : string = "uwallet";

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

    public async put(key: String[], dbname: String) : Promise<void> {
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collectionName);
		let result;
		switch(dbname){
			case "income_db":
				result = await collection.updateOne({'income_name': key[0], 'income_total': key[1], 'date': key[2], 'category': key[3]});
				break;
			case "expense_db":
				result = await collection.updateOne({'expense_name': key[0], 'expense_total': key[1], 'date': key[2], 'category': key[3]});
				break;
			case "trans_db":
				result = await collection.updateOne({'trans_name': key[0], 'trans_type': key[1], 'category': key[2], 'date': key[3]});
				break;
			case "monthly_db":
				result = await collection.updateOne({'monthly_expense': key[0], 'monthly_cost': key[1]});
				break;
			case "userinfo_db":
				result = await collection.updateOne({'name': key[0], 'iemail': key[1], 'age': key[2], 'password': key[3]});
				break;
		}
		console.log("result = " + result);
    }

    public async get(key: string) : Promise<string> {
		let db = this.client.db(this.dbName); // this.level(this.dbFile);
		let collection = db.collection(this.collectionName);
		console.log("get: key = " + key);
		let result = await collection.findOne({'name' : key });
		console.log("get: returned " + JSON.stringify(result));
		if (result) {
		    return result.value;
		} else {
		    return null;
		}
    }
    
    public async del(key: string) : Promise<void> {
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collectionName);
		console.log("delete: key = " + key);
		let result = await collection.deleteOne({'name' : key });
		console.log("result = " + result);
		// await this.db.del(key);
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
