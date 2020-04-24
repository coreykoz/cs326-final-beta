const url = "http://localhost:8080/uwallet"; // NOTE NEW URL



// NEW: helper method for posting data
async function postData(url, data) {
    const resp = await fetch(url,
                             {
                                 method: 'POST',
                                 mode: 'cors',
                                 cache: 'no-cache',
                                 credentials: 'same-origin',
                                 headers: {
                                     'Content-Type': 'application/json'
                                 },
                                 redirect: 'follow',
                                 body: JSON.stringify(data)
                             });
    return resp;
}

//CREATES
function createIncome(){
    (async () => {
        let incomeName = document.getElementById("incomeName").value;
        let incomeTotal = document.getElementById("incomeTotal").value;
        let incomeDate = document.getElementById("incomeDate").value;
        let incomeCategory = document.getElementById("incomeCategory").value;

        let data = { 'income_name': incomeName, 'income_total': incomeTotal, 'date': incomeDate, 'category': incomeCategory,  'id': "income"};
        
        
        const newURL = url + "/createIncome"; 
        const resp = await postData(newURL, data);
        const j = await resp.json();
        createTransaction(incomeName, incomeTotal, incomeDate, incomeCategory, "Income");
	})();
}

function createExpense(){
    (async () => {
        let expenseName = document.getElementById("expenseName").value;
        let expenseTotal = document.getElementById("expenseTotal").value;
        let expenseDate = document.getElementById("expenseDate").value;
        let expenseCategory = document.getElementById("expenseCategory").value;

        let data = { 'expense_name': expenseName, 'expense_total': expenseTotal, 'date': expenseDate, 'category': expenseCategory, 'id': "expense"};
        createTransaction(expenseName, expenseTotal, expenseDate, expenseCategory, "Expense");
        
        const newURL = url + "/createExpense"; 
        const resp = await postData(newURL, data);
        const j = await resp.json();
	})();
}

function createTransaction(name, total, date, cate, type){
    //reformat this data into our documentation verison of it
    (async () => {
    let id = "transaction";
    let data = {'trans_name' : name, 'trans_type': type, 'trans_category': cate, 'trans_date': date, 'trans_price': total, 'id': id};

    const newURL = url + "/createTransaction"; 
    const resp = await postData(newURL, data);
    const j = await resp.json();

    //modify later
	if (j['result'] !== 'error') {
        document.getElementById("trans_table").innerHTML = "<tr><td>" +  name + "</td><td>" + type + "</td><td>" + 
        cate + "</td><td>" + date + "</td><td>" + total + "</td></tr>" + document.getElementById("trans_table").innerHTML;
	} else {
	    document.getElementById("output").innerHTML = name + " not found.";
    }

    })();
}

//READ IDs:
// transaction, expense, income, userInfo, monthly

function readTransaction(){
    (async () => {
    let id = {'id':"transaction"};

    const newURL = url + "/read"; 
    const resp = await postData(newURL, id);
    const j = await resp.json();
    if (j) {
        console.log(j);
        return j;
	} else {
	    return "Error: Could not read";
    }
    })();
}

function readMonthly(){
    (async () => {
    let id = {'id':"monthly"};

    const newURL = url + "/read"; 
    const resp = await postData(newURL, id);
    const j = await resp.json();
    if (j) {
        console.log(j);
        return j;
	} else {
	    return "Error: Could not read";
    }
    })();
}


// UPDATES

function updateMonthly(){
    (async () => {
        let monthlyName = document.getElementById("monthlyName").value;
        let monthlyCost = document.getElementById("monthlyTotal").value;

        const newURL = url + "/updateMonthly";
        const data = { 'monthly_expense': monthlyName, 'monthly_cost': monthlyCost, 'id': "monthly"};
	    const resp = await postData(newURL, data);    
	    const j = await resp.json();
	    
    })();
}


// DELETES

function deleteMonthly(){
    (async () => {
        let expenseName = document.getElementById("expenseName").value;

        let data = { 'expense_name': expenseName};
        const newURL = url + "/deleteMonthly"; 
        const resp = await postData(newURL, data);
        const j = await resp.json();

	})();
}

function createMonthly(){
    (async () => {
        let expenseName = document.getElementById("expenseName").value;
        let monthlyCost = document.getElementById("monthlyCost").value;
        let data = { 'expense_name': expenseName, 'monthly_cost': monthlyCost};
        //addTransaction(data);
        const newURL = url + "/createMonthly"; 
        const resp = await postData(newURL, data);
        const j = await resp.json();

        //modify later
	    if (j['result'] !== 'error') {
	        document.getElementById("output").innerHTML = "101: <b>" + userName + ", " + counterName + " created.</b>";
	    } else {
	        document.getElementById("output").innerHTML = "100: " + userName + ", " + counterName + " not found.</b>";
        }
	})();
}



//doesnt work
function createUserInfo(){
    //same as add income
    (async () => {
        let name = document.getElementById("fullname").value;
        let email = document.getElementById("email").value;
        let age = document.getElementById("age").value;
        //let createpass = document.getElementById("createpass").value;
        let password = document.getElementById("confirmpass").value;

        //we could try to compare the password entries

        let data = {"name": name, 'email': email, 'age': age, 'password': password};
        const newURL = url + "/createUserInfo"; 
        const resp = await postData(newURL, data);
        const j = await resp.json();

        //modify later
	    if (j['result'] !== 'error') {
	        document.getElementById("output").innerHTML = "101: <b>" + userName + ", " + counterName + " created.</b>";
	    } else {
	        document.getElementById("output").innerHTML = "100: " + userName + ", " + counterName + " not found.</b>";
        }
	})();
}


//will not modify html ON ITS OWN
//the thinking is that our drawPieChart will call readTransaction --> data --> graph based on data

function drawTable(){
    //call readTransaction -> array of documents (transactions)
    // actually modify html
    console.log("about to calculate readTrans()");
    let val = readTransaction();
    console.log(val);
}


