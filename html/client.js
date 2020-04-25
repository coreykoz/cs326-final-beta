//const url = "https://cryptic-eyrie-49046.herokuapp.com/uwallet";
const url = "http://localhost:8080/uwallet";

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
    let data = {'trans_name' : name, 'trans_price': total, 'trans_category': cate, 'trans_date': date, 'trans_type': type, 'id': id};

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

async function readTransaction(){
    let id = {'id':"transaction"};

    const newURL = url + "/read"; 
    const resp = await postData(newURL, id);
    const j = await resp.json();
    if (j) {
        return j;
	} else {
	    return "Error: Could not read";
    }
}

async function readMonthly(){
    let id = {'id':"monthly"};

    const newURL = url + "/read"; 
    const resp = await postData(newURL, id);
    const j = await resp.json();
    if (j) {
        return j;
	} else {
	    return "Error: Could not read";
    }
}

async function readIncome(){
        let id = {'id':"income"};
    
        const newURL = url + "/read"; 
        const resp = await postData(newURL, id);
        const j = await resp.json();
        if (j) {
            return j;
        } else {
            return "Error: Could not read";
        }
}

async function readExpense(){
        let id = {'id':"expense"};
    
        const newURL = url + "/read"; 
        const resp = await postData(newURL, id);
        const j = await resp.json();
        if (j) {
            return j;
        } else {
            return "Error: Could not read";
        }
}

// UPDATES

async function updateMonthly(){
        let monthlyName = document.getElementById("monthlyName").value;
        let monthlyCost = document.getElementById("monthlyTotal").value;

        const newURL = url + "/updateMonthly";
        const data = { 'monthly_expense': monthlyName, 'monthly_cost': monthlyCost, 'id': "monthly"};
	    const resp = await postData(newURL, data);
	    const j = await resp.json();
}


// DELETES

function deleteMonthly(){
    (async () => {
        let expenseName = document.getElementById("monthlyName").value;

        let data = { 'expense_name': expenseName, 'id': "monthly"};
        const newURL = url + "/deleteMonthly"; 
        const resp = await postData(newURL, data);
        const j = await resp.json();

	})();
}


// ALL DRAW FUNCTIONS:
// This is all assuming TA's get back to us and the functions work as intended
//
// 1) call a read --> returns an array of documents (in JSON format)
// 2) process data and draw/create graphs


//Money formatter
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});

// Table - Should be calling readTransaction() and displaying results
async function drawTransTable(){

    // Get array of JSONs
    let array = await readTransaction();

    // [ {'name': "something", 'counter': 2} , {'name': "something", 'counter': 2}]
    //  array[0].name = "something"
    // array[0].counter = 2

    //Sort by date, descending 
    array.sort(function(a, b){
        //converts "2020-04-24" to "2020/04/24" and creates date obj
        let date1 = new Date(a.trans_date.replace(/-/g, '/'));
        let date2 = new Date(b.trans_date.replace(/-/g, '/'));
        
        return date1.getTime() - date2.getTime();
    });

    
    //Draws each row of HTML based on sorted array
    for(let i = 0; i < array.length; i++){
        let name = array[i].trans_name;
        let type = array[i].trans_type;
        let cate = array[i].trans_category;
        let date = array[i].trans_date;
        let total = array[i].trans_price;

        document.getElementById("trans_table").innerHTML = "<tr><td>" +  name + "</td><td>" + type + "</td><td>" + 
         cate + "</td><td>" + date + "</td><td>" + formatter.format(total) + "</td></tr>" + document.getElementById("trans_table").innerHTML;
    }
}

// Table - Should be calling readMonthly() and displaying results
async function drawMonthlyTable(){
   
    // Get array of JSONs
    let array = await readMonthly();
    
    //Draws each row of HTML
    for(let i = 0; i < array.length; i++){
        let name = array[i].monthly_expense;
        let total = array[i].monthly_cost;

        document.getElementById("monthly_table").innerHTML = "<tr><td>" +  name + "</td><td>" + formatter.format(total) +  "</td></tr>" + document.getElementById("monthly_table").innerHTML;
    }
}


// Pie Chart - Should be calling readExpenses() and only using values from current month
function drawMonthlySpendingByCateGraph(){
    let array = readExpense();
    const currDate = new Date(); // gets the current date as a string
    const currMonth = currDate.getMonth();
    
    let groceryTotal;
    let transportTotal;
    let entertainmentTotal;
    let loanTotal;
    let shoppingTotal;
    let billTotal;
    let dineTotal;
    for(let i = 0; i < array.length; i++){
        if(new Date(array[i].date.replace(/-/g, '/')).getMonth() == currMonth){ 
            //get category and price
            if(array[i].category == "Grocery"){
                groceryTotal += parseFloat(array[i].expense_total);
            }
            else if(array[i].category == "Transportation & Gas"){
                transportTotal += parseFloat(array[i].expense_total);
            }
            else if(array[i].category == "Entertainment"){
                entertainmentTotal += parseFloat(array[i].expense_total);
            }
            else if(array[i].category == "Loans & Other Payments"){
                loanTotal += parseFloat(array[i].expense_total);
            }
            else if(array[i].category == "Shopping"){
                shoppingTotal += parseFloat(array[i].expense_total);
            }
            else if(array[i].category == "Bills & Insurance"){
                billTotal += parseFloat(array[i].expense_total);
            }
            else if(array[i].category == "Restaurant & Dining"){
                dineTotal += parseFloat(array[i].expense_total);
            }
            else{
    
            }
    
        let allCategory  = [["Grocery",groceryTotal], ["Transportation & Gas", transportTotal], ["Entertainment", entertainmentTotal], ["Loans & Other Payments", loanTotal], ["Shopping", shoppingTotal], ["Bills & Insurance", billTotal], ["Restaurant & Dining", dineTotal]];
        //display this array
    }
}

    

// Bar Chart - Should be calling readExpenses() - have one array hold all docs from readExpenses() for current month and another for the rest
//                                                we'll calculate budget based on avg spending? Or we could have more data (inside userInfo or a separate data structure)
//                                                that allows input for budget
/*
function drawBudgetGraph(){
    let array = readExpense();
    const currDate = new Date(); // gets the current date as a string
    const currMonth = currDate.getMonth();

    for(let i = 0; i < array.length; i++){  
        if(new Date(array[i].date.replace(/-/g, '/')).getMonth() == currMonth){ 
            monthlyArray += array[i];
        }
    }
}
*/

// Table - Should be calling readExpenses() and putting top 3-5 values (total spent wise) on table
async function drawMostPopSpendingTable(){
    let array = await readExpense();

    //Calculation
    let groceryTotal;
    let transportTotal;
    let entertainmentTotal;
    let loanTotal;
    let shoppingTotal;
    let billTotal;
    let dineTotal;

    for(let i=0; i < array.length; i++){
        if(array[i].category == "Grocery"){
            groceryTotal += parseFloat(array[i].expense_total);
        }
        else if(array[i].category == "Transportation & Gas"){
            transportTotal += parseFloat(array[i].expense_total);
        }
        else if(array[i].category == "Entertainment"){
            entertainmentTotal += parseFloat(array[i].expense_total);
        }
        else if(array[i].category == "Loans & Other Payments"){
            loanTotal += parseFloat(array[i].expense_total);
        }
        else if(array[i].category == "Shopping"){
            shoppingTotal += parseFloat(array[i].expense_total);
        }
        else if(array[i].category == "Bills & Insurance"){
            billTotal += parseFloat(array[i].expense_total);
        }
        else if(array[i].category == "Restaurant & Dining"){
            dineTotal += parseFloat(array[i].expense_total);
        }
        else{

        }

    let allCategory  = [["Grocery",groceryTotal], ["Transportation & Gas", transportTotal], ["Entertainment", entertainmentTotal], ["Loans & Other Payments", loanTotal], ["Shopping", shoppingTotal], ["Bills & Insurance", billTotal], ["Restaurant & Dining", dineTotal]];

    allCategory.sort(function(a, b){        
        return a[1] - b[1];
    });

    }
    //Draws each row of HTML
    for(let i = 0; i < allCategory.length; i++){
        document.getElementById("popspend_table").innerHTML = "<tr><td>" +  i[i][0] + "</td><td>" + i[i][1] + "</td></tr>"+ document.getElementById("popspend_table").innerHTML;
        
    }

}


// Line Graph - forget what this one does, anna input? shows the monthly trend filtered down by category
function drawLineGraph(){
    let array = readExpense();
    let cate;
    let month;
    let total;

    for(i = 0; i < array.length; i++){
        
    }

    //might have to create array that holds the category, date and expense amt
}
}
