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


function addIncome(){
    (async () => {
        let incomeName = document.getElementById("incomeName").value;
        let incomeTotal = document.getElementById("incomeTotal").value;
        let incomeDate = document.getElementById("incomeDate").value;
        let incomeCategory = document.getElementById("incomeCategory").value;

        let data = { 'income_name': incomeName, 'income_total': incomeTotal, 'date': incomeDate, 'category': incomeCategory};
        addTransaction(data, "income");
        
        const newURL = url + "/addIncome"; 
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

function addExpense(){
    (async () => {
        let expenseName = document.getElementById("expenseName").value;
        let expenseTotal = document.getElementById("expenseTotal").value;
        let expenseDate = document.getElementById("expenseDate").value;
        let expenseCategory = document.getElementById("expenseCategory").value;

        let data = { 'expense_name': expenseName, 'expense_total': expenseTotal, 'date': expenseDate, 'category': expenseCategory};
        addTransaction(data, "expense");
        
        const newURL = url + "/addExpense"; 
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

function addTransaction(data, type){
    //reformat this data into our documentation verison of it
    if(type = "income"){
        let transactionName = incomeName;
        let transactionType = type;
        let category = incomeCategory;
        let date = incomeDate;

        let data = {'trans_name' : transactionName, 'trans_type': transactionType, 'trans_category': category, 'trans_date': date}
    }

    else if (type = 'expense'){
        let transactionName = expenseName;
        let transactionType = type;
        let category = expenseCategory;
        let date = expenseDate;

        let data = {'trans_name' : transactionName, 'trans_type': transactionType, 'trans_category': category, 'trans_date': date}
    }
    //need to add functionality to monthly expenses
}

function addMonthly(){
    (async () => {
        let expenseName = document.getElementById("expenseName").value;
        let monthlyCost = document.getElementById("monthlyCost").value;
        let data = { 'expense_name': expenseName, 'monthly_cost': monthlyCost};
        //addTransaction(data);
        const newURL = url + "/addMonthly"; 
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

function removeMonthly(){
    (async () => {
        let expenseName = document.getElementById("expenseName").value;
        let monthlyCost = document.getElementById("monthlyCost").value;

        let data = { 'expense_name': expenseName, 'monthly_cost': monthlyCost};
        const newURL = url + "/removeMonthly"; 
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

function addUserInfo(){
    //same as add income
    (async () => {
        let name = document.getElementById("fullname").value;
        let email = document.getElementById("email").value;
        let age = document.getElementById("age").value;
        //let createpass = document.getElementById("createpass").value;
        let password = document.getElementById("confirmpass").value;

        //we could try to compare the password entries

        let data = {"name": name, 'email': email, 'age': age, 'password': password};
        const newURL = url + "/addUserInfo"; 
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