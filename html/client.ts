//const url = "https://cryptic-eyrie-49046.herokuapp.com/uwallet";
const url = "http://localhost:8080/uwallet";

//canvas for the graphs
const ctx = (<HTMLCanvasElement>document.getElementById('monthySpending'));
const ctx2 = (<HTMLCanvasElement>document.getElementById('budget'));
const ctx3 = (<HTMLCanvasElement>document.getElementById('predictedSpending'));

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
        let incomeName = (<HTMLInputElement>document.getElementById("incomeName")).value;
        let incomeTotal = (<HTMLInputElement>document.getElementById("incomeTotal")).value;
        let incomeDate = (<HTMLInputElement>document.getElementById("incomeDate")).value;
        let incomeCategory = (<HTMLInputElement>document.getElementById("incomeCategory")).value;

        let data = { 'income_name': incomeName, 'income_total': incomeTotal, 'date': incomeDate, 'category': incomeCategory,  'id': "income"};
        
        
        const newURL = url + "/createIncome"; 
        const resp = await postData(newURL, data);
        const j = await resp.json();
        createTransaction(incomeName, incomeTotal, incomeDate, incomeCategory, "Income");
	})();
}

function createExpense(){
    (async () => {
        let expenseName = (<HTMLInputElement>document.getElementById("expenseName")).value;
        let expenseTotal = (<HTMLInputElement>document.getElementById("expenseTotal")).value;
        let expenseDate = (<HTMLInputElement>document.getElementById("expenseDate")).value;
        let expenseCategory = (<HTMLInputElement>document.getElementById("expenseCategory")).value;

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
        let monthlyName = (<HTMLInputElement>document.getElementById("monthlyName")).value;
        let monthlyCost = (<HTMLInputElement>document.getElementById("monthlyTotal")).value;

        const newURL = url + "/updateMonthly";
        const data = { 'monthly_expense': monthlyName, 'monthly_cost': monthlyCost, 'id': "monthly"};
	    const resp = await postData(newURL, data);
	    const j = await resp.json();
}


// DELETES

function deleteMonthly(){
    (async () => {
        let expenseName = (<HTMLInputElement>document.getElementById("monthlyName")).value;

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
   
    //reset table first
    document.getElementById("monthly_table").innerHTML = "";

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
async function drawMonthlySpendingByCateGraph(){
    let array = await readExpense();
    const currDate = new Date(); // gets the current date as a string
    const currMonth = currDate.getMonth();
    
    let groceryTotal = 0;
    let transportTotal= 0;
    let entertainmentTotal= 0;
    let loanTotal= 0;
    let shoppingTotal= 0;
    let billTotal= 0;
    let dineTotal= 0;

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
        }
    }
        let allCategory  = [["Grocery",groceryTotal], ["Transportation & Gas", transportTotal], ["Entertainment", entertainmentTotal], ["Loans & Other Payments", loanTotal], ["Shopping", shoppingTotal], ["Bills & Insurance", billTotal], ["Restaurant & Dining", dineTotal]];
        //display this array

        var pieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Grocery', 'Transportation & Gas', 'Entertainment', 'Loans & Other Payments', 'Shopping', 'Bills & Insurance', 'Restaurant & Dining'],
                datasets: [{
                    label: 'Spending by Category',
                    data: [groceryTotal, transportTotal, entertainmentTotal, loanTotal, shoppingTotal, billTotal, dineTotal],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(196, 249, 143, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(196, 249, 143, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

    
}

/*
Available funds display
read income - read expenses
should update when income or expenses is changed - should budget be factored into this??
*/
async function totalAvailable(){
    let expenses = await readExpense();
    let income = await readIncome();
    let expenseTotal = 0;
    let incomeTotal = 0;
   
    for (let i=0; i < expenses.length; i++){
        expenseTotal += parseFloat(expenses[i].expense_total);
    }
    for (let i=0; i < income.length; i++){
        incomeTotal += parseFloat(income[i].income_total);
    }
    
    let remaining = (expenseTotal - incomeTotal).toFixed(2);
    remaining.toString();
    
    if(expenseTotal > incomeTotal){
        document.getElementById("totalMoney").innerHTML = "-" + remaining;

    }
    else{
        document.getElementById("totalMoney").innerHTML = "" + remaining;
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
    let groceryTotal = 0;
    let transportTotal = 0;
    let entertainmentTotal = 0;
    let loanTotal = 0;
    let shoppingTotal = 0;
    let billTotal = 0;
    let dineTotal = 0;

    //reset table
    document.getElementById("popspend_table").innerHTML = "";

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
    }
    let allCategory  = [["Grocery", groceryTotal], ["Transportation & Gas", transportTotal], ["Entertainment", entertainmentTotal], ["Loans & Other Payments", loanTotal], ["Shopping", shoppingTotal], ["Bills & Insurance", billTotal], ["Restaurant & Dining", dineTotal]];

    allCategory.sort(function(a: any, b: any){        
        return a[1] - b[1];
    });
    
    //Draws each row of HTML
    for(let i = 0; i < allCategory.length; i++){
        let str: any = allCategory[i][1];
        document.getElementById("popspend_table").innerHTML = "<tr><td>" +  allCategory[i][0] + "</td><td>" + formatter.format(str) + "</td></tr>"+ document.getElementById("popspend_table").innerHTML; 
    }
}


// Line Graph - forget what this one does, anna input? shows the monthly trend filtered down by category
async function drawLineGraph(){
    let array = await readExpense();
    let cate;
    let month=[];
    console.log(month);
    let total;
    //const currDate = new Date(); // gets the current date as a string
    //const currMonth = currDate.getMonth();

    let grocery = [];
    let transport = [];     
    let entertainment = [];
    let loan= [];
    let shopping= [];
    let bill= [];
    let dine= [];

    array.sort(function(a, b){
        //converts "2020-04-24" to "2020/04/24" and creates date obj
        let date1 = new Date(a.date.replace(/-/g, '/'));
        let date2 = new Date(b.date.replace(/-/g, '/'));
        
        return date1.getTime() - date2.getTime();
    });

    for(let i=0; i < array.length; i++){
        if(array[i].category == "Grocery"){
            grocery.push(array[i].expense_total);
            let date = new Date(array[i].date);
            month.push(date);
            //month.push(new Date(array[i].date));
            console.log(array[i].date);
            console.log(month);
        }
        else if(array[i].category == "Transportation & Gas"){
            transport.push(array[i].expense_total);
            month.push(array[i].date);
        }
        else if(array[i].category == "Entertainment"){
            entertainment.push(array[i].expense_total);
            month.push(array[i].date);
        }
        else if(array[i].category == "Loans & Other Payments"){
            loan.push(array[i].expense_total);
            month.push(array[i].date);
        }
        else if(array[i].category == "Shopping"){
            shopping.push(array[i].expense_total);
            month.push(array[i].date);
        }
        else if(array[i].category == "Bills & Insurance"){
            bill.push(array[i].expense_total);
            month.push(array[i].date);
        }
        else if(array[i].category == "Restaurant & Dining"){
            dine.push(array[i].expense_total);
            month.push(array[i].date);
        }
        else{

        }
    }
    
    /*console.log(grocery);
    console.log(transport);
    console.log(entertainment);
    console.log(loan);
    console.log(shopping);
    console.log(bill);
    console.log(dine);*/


    var lineGraph = new Chart(ctx3, {
        type: 'line',
        data: {
            labels: month,
            datasets: [{
                label: 'Grocery',
                data: grocery,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                    /*'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'*/
                ],
                borderColor: [
                    //'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                    //'rgba(255, 206, 86, 1)',
                    //'rgba(75, 192, 192, 1)',
                    //'rgba(153, 102, 255, 1)',
                    //'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            },{
                label: 'Transportation & Gas',
                data: transport,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(196, 249, 143, 0.2)'
            ],
                borderColor:  [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(196, 249, 143, 1)'
            ],
                borderWidth: 1
            },{
                label: 'Entertainment',
                data: entertainment,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            },{
                label: 'Loan & Other Payments',
                data: loan,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            },{
                label: 'Shopping',
                data: shopping,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            
        },{
            label: 'Bills & Insurance',
            data: bill,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        },{
            label: 'Restaurant & Dining',
            data: dine,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
            scales: {
                /*xAxes: [{
                    type: 'time'
                }], */
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            }
        }
    });

    //might have to create array that holds the category, date and expense amt
}


//converts 2-d array into 2 separate arrays
/*var count = drawMonthlySpendingByCateGraph().length;
var counter = 0;
while(count > 0){
  // Remove brackets around right hand side to prevent 2 dimensional arrays
  LabelResult[counter] = drawMonthlySpendingByCateGraph[counter].category;
  counter++;
  count --;
}

var count = Data.length;
var counter = 0;

while(count > 0){
  DataResult[counter] = drawMonthlySpendingByCateGraph[counter].expense_total;
  counter++;
  count --;
}*/

// GRAPHS
//1. Piechart

/*var pieChart = new Chart(ctx, {
    type: 'pie',
    data: {
        //labels: ['Grocery', 'Transportation & Gas', 'Entertainment', 'Loans & Other Payments', 'Shopping', 'Bills & Insurance', 'Restaurant & Dining'],
        labels: LabelResult,
        datasets: [{
            label: 'Spending by Category',
            data: DataResult,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(196, 249, 143, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(196, 249, 143, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

//2. Bar chart
var barChart = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['Grocery', 'Transportation & Gas', 'Entertainment', 'Loans & Other Payments', 'Shopping', 'Bills & Insurance', 'Restaurant & Dining'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3, 4],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(196, 249, 143, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(196, 249, 143, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});*/

//Line graph
/*
var lineGraph = new Chart(ctx3, {
    type: 'line',
    data: {
        labels: ['Nov','Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [{
            label: 'Grocery',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        },{
            label: 'Transportation',
            data: [7,9,4,12,5,2],
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(196, 249, 143, 0.2)'
        ],
            borderColor:  [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(196, 249, 143, 1)'
        ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});*/
