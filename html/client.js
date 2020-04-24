const url = "https://cryptic-eyrie-49046.herokuapp.com/uwallet";

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

function readIncome(){
    (async () => {
        let id = {'id':"income"};
    
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

function readExpense(){
    (async () => {
        let id = {'id':"expense"};
    
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

// Table - Should be calling readTransaction() and displaying results
function drawTransTable(){

    // Get array of JSONs
    let array = readTransaction();

    //Sort by date, descending 
    array.sort(function(a, b){

        //converts "2020-04-24" to "2020/04/24" and creates date obj
        let date1 = new Date(a.replace(/-/g,'/'));
        let date2 = new Date(b.replace(/-/g,'/'));

        return date2 - date1;
    });
    
    //Draws each row of HTML based on sorted array
    for(let i = 0; i < array.length; i++){
        let name = array[i].mon;
        let type = array[i].trans_type;
        let cate = array[i].trans_category;
        let date = array[i].trans_date;
        let total = array[i].trans_price;

        document.getElementById("trans_table").innerHTML = "<tr><td>" +  name + "</td><td>" + type + "</td><td>" + 
        cate + "</td><td>" + date + "</td><td>" + total + "</td></tr>" + document.getElementById("trans_table").innerHTML;
    }
}

// Table - Should be calling readMonthly() and displaying results
function drawMonthlyTable(){
    // 
    //let val = readMonthly();
    //console.log(val);

    // Get array of JSONs
    let array = readMonthly();
    
    //Draws each row of HTML
    for(let i = 0; i < array.length; i++){
        let name = array[i].monthlyName;
        let total = array[i].monthlyCost;

        document.getElementById("monthly_table").innerHTML = "<tr><td>" +  name + "</td><td>" + total + document.getElementById("monthly_table").innerHTML;
    }
}


// Pie Chart - Should be calling readExpenses() and only using values from current month
function drawMonthlySpendingByCateGraph(){
    let array = readExpense();
    const currDate = new Date(); // gets the current date as a string
    const currMonth = currDate.getMonth();

    //need to compare expense date month to current month
    //if the months match
    for( let i = 0; i < array.length; i++){
        if(i.expense.date.getMonth() == currMonth){ //don't know how to access the date from the expense
            //get category and price
            //add up to get a total for the categoy
            //add category + total to graph
            //document.getElementById("monthySpending").innerHTML = category + total + document.getElementById("monthySpending").innerHTML;
        }
        else{
            //idk
        }
    }
}

    

// Bar Chart - Should be calling readExpenses() - have one array hold all docs from readExpenses() for current month and another for the rest
//                                                we'll calculate budget based on avg spending? Or we could have more data (inside userInfo or a separate data structure)
//                                                that allows input for budget
function drawBudgetGraph(){

}

// Table - Should be calling readExpenses() and only using values from current month and putting top 3-5 values (total spent wise) on table
function drawMostPopSpendingTable(){
    let array = readExpense();

    var x = new GroupBy(array, expenseCategory);

    x.sum();

    //Calculation
    //for(let i=0; i<array)
    
    //Draws each row of HTML
    for(let i = 0; i < array.length; i++){
        //let name = array[i].expenseName;
        let cate = array[i].expenseCategory;
        let total = array[i].monthlyCost;

        document.getElementById("popspend_table").innerHTML = "<tr><td>" +  cate + "</td><td>" + total + document.getElementById("popspend_table").innerHTML;
    }

}

// Line Graph - forget what this one does, anna input? shows the monthly trend filtered down by category
function drawLineGraph(){
    //might have to create array that holds the category, date and expense amt
}