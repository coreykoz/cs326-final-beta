const url = "https://cryptic-eyrie-49046.herokuapp.com/uwallet";
//const url = "http://localhost:8080/uwallet";

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


        //budget requirement checker
        if (incomeName == "" || incomeTotal == "" || incomeDate == "" || incomeCategory == "")
            return

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

        //budget requirement checker
        if (expenseName == "" || expenseTotal == "" || expenseDate == "" || expenseCategory == "")
            return

        let data = { 'expense_name': expenseName, 'expense_total': expenseTotal, 'date': expenseDate, 'category': expenseCategory, 'id': "expense"};
        createTransaction(expenseName, expenseTotal, expenseDate, expenseCategory, "Expense");
        
        const newURL = url + "/createExpense"; 
        const resp = await postData(newURL, data);
        const j = await resp.json();
	})();
}

function createTransaction(name, total, date, cate, type){ 
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

async function readBudget(){
    let id = {'id':"budget"};

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

        //budget requirement checker
        if (monthlyName == "" || monthlyCost == "")
            return

        const newURL = url + "/updateMonthly";
        const data = { 'monthly_expense': monthlyName, 'monthly_cost': monthlyCost, 'id': "monthly"};
	    const resp = await postData(newURL, data);
	    const j = await resp.json();
}

async function updateBudget(){
    let budgetCate = (<HTMLInputElement>document.getElementById("budgetCategory")).value;
    let budgetTotal = (<HTMLInputElement>document.getElementById("budgetTotal")).value;
    
    //budget requirement checker
    if (budgetCate == "" || budgetTotal == "")
        return

    const newURL = url + "/updateBudget";
    const data = { 'budget_category': budgetCate, 'budget_total': budgetTotal, 'id': "budget"};
	const resp = await postData(newURL, data);
    const j = await resp.json();
}


// DELETES
function deleteMonthly(){
    (async () => {
        let expenseName = (<HTMLInputElement>document.getElementById("monthlyName")).value;

        if (expenseName == "")
            return

        let data = { 'expense_name': expenseName, 'id': "monthly"};
        const newURL = url + "/deleteMonthly"; 
        const resp = await postData(newURL, data);
        const j = await resp.json();

	})();
}

function deleteBudget(){
    (async () => {
        let budgetCate = (<HTMLInputElement>document.getElementById("budgetCategory")).value;

        let data = { 'budget_category': budgetCate, 'id': "budget"};
        const newURL = url + "/deleteBudget"; 
        const resp = await postData(newURL, data);
        const j = await resp.json();

	})();
}

// ALL DRAW FUNCTIONS:
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
    
    let remaining = (incomeTotal - expenseTotal).toFixed(2);
    remaining.toString();
   

    if(expenseTotal > incomeTotal){
        document.getElementById("totalMoney").innerHTML = "-$" + remaining;
    }
    else{
        document.getElementById("totalMoney").innerHTML = "$" + remaining;
    }

}
    

// Bar Chart - Should be calling readExpenses()

async function drawBudgetGraph(){
    let array = await readBudget();
    let expense = await readExpense();
    let budgetArray = [0,0,0,0,0,0,0];
    let expenseArray = [0,0,0,0,0,0,0];

    for(let i = 0; i < array.length; i++){
        if(array[i].budget_category == "Grocery"){
            budgetArray[0] = parseFloat(array[i].budget_total);
        }
        else if(array[i].budget_category == "Transportation & Gas"){
            budgetArray[1] = parseFloat(array[i].budget_total);
        }
        else if(array[i].budget_category == "Entertainment"){
            budgetArray[2] = parseFloat(array[i].budget_total);
        }
        else if(array[i].budget_category == "Loans & Other Payments"){
            budgetArray[3] = parseFloat(array[i].budget_total);
        }
        else if(array[i].budget_category == "Shopping"){
            budgetArray[4] = parseFloat(array[i].budget_total);
        }
        else if(array[i].budget_category == "Bills & Insurance"){
            budgetArray[5] = parseFloat(array[i].budget_total);
        }
        else if(array[i].budget_category == "Restaurant & Dining"){
            budgetArray[6] = parseFloat(array[i].budget_total);
        }
        else{

        }

    }

    for(let i = 0; i < expense.length; i++){
            if(expense[i].category == "Grocery"){
                expenseArray[0] += parseFloat(expense[i].expense_total);
            }
            else if(expense[i].category == "Transportation & Gas"){
                expenseArray[1] += parseFloat(expense[i].expense_total);
            }
            else if(expense[i].category == "Entertainment"){
                expenseArray[2] += parseFloat(expense[i].expense_total);
            }
            else if(expense[i].category == "Loans & Other Payments"){
                expenseArray[3] += parseFloat(expense[i].expense_total);
            }
            else if(expense[i].category == "Shopping"){
                expenseArray[4] += parseFloat(expense[i].expense_total);
            }
            else if(expense[i].category == "Bills & Insurance"){
                expenseArray[5] += parseFloat(expense[i].expense_total);
            }
            else if(expense[i].category == "Restaurant & Dining"){
                expenseArray[6] += parseFloat(expense[i].expense_total);
            }
            else{
    
            }
    }

    var mixedChart = new Chart(ctx2, {
        type: 'bar',
        data: {
            datasets: [{
                label: 'Spending',
                data: expenseArray,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
            }, {
                label: 'Budget',
                data: budgetArray,
                type: 'bar',
                backgroundColor: [
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(75, 192, 192, 0.8)'
                    ],
                    borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
            }],
            labels: ['Grocery', 'Transportation & Gas', 'Entertainment', 'Loan & Other Payments', 'Shopping', 'Bills & Insurance', 'Restaurant & Dining']
        },
        options: {  scales: {
                    xAxes: [{ stacked: true }],
                    yAxes: [{
                    ticks: {
                        beginAtZero:true
                    },
                    stacked: false
            }]
        } 
    }
    });
    
}


// Table - Should be calling readExpenses() 
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


// Line Graph - shows the monthly trend filtered down by category
async function drawLineGraph(){
    let array = await readExpense();
    let month=['Dec', 'Jan', 'Feb', 'Mar', 'Apr','May'];

    let grocery = [0,0,0,0,0,0];
    let transport = [0,0,0,0,0,0];     
    let entertainment = [0,0,0,0,0,0];
    let loan= [0,0,0,0,0,0];
    let shopping= [0,0,0,0,0,0];
    let bill= [0,0,0,0,0,0];
    let dine= [0,0,0,0,0,0];

    array.sort(function(a, b){
        //converts "2020-04-24" to "2020/04/24" and creates date obj
        let date1 = new Date(a.date.replace(/-/g, '/'));
        let date2 = new Date(b.date.replace(/-/g, '/'));
        
        return date1.getTime() - date2.getTime();
    });

    for(let i=0; i < array.length; i++){
        
        if(array[i].category == "Grocery"){
            let date = new Date(array[i].date.replace(/-/g, '/'));
            grocery[date.getMonth()+1] = grocery[date.getMonth()+1] + parseFloat(array[i].expense_total);     
        }
        else if(array[i].category == "Transportation & Gas"){
            let date = new Date(array[i].date.replace(/-/g, '/'));
            transport[date.getMonth()+1] = transport[date.getMonth()+1] + parseFloat(array[i].expense_total);
        }
        else if(array[i].category == "Entertainment"){
            let date = new Date(array[i].date.replace(/-/g, '/'));
            entertainment[date.getMonth()+1] = entertainment[date.getMonth()+1] + parseFloat(array[i].expense_total);
        }
        else if(array[i].category == "Loans & Other Payments"){
            let date = new Date(array[i].date.replace(/-/g, '/'));
            loan[date.getMonth()+1] = loan[date.getMonth()+1] + parseFloat(array[i].expense_total);
        }
        else if(array[i].category == "Shopping"){
            let date = new Date(array[i].date.replace(/-/g, '/'));
            shopping[date.getMonth()+1] = shopping[date.getMonth()+1] + parseFloat(array[i].expense_total);
        }
        else if(array[i].category == "Bills & Insurance"){
            let date = new Date(array[i].date.replace(/-/g, '/'));
            bill[date.getMonth()+1] = bill[date.getMonth()+1] + parseFloat(array[i].expense_total);
        }
        else if(array[i].category == "Restaurant & Dining"){
            let date = new Date(array[i].date.replace(/-/g, '/'));
            dine[date.getMonth()+1] = dine[date.getMonth()+1] + parseFloat(array[i].expense_total);
        }
        else{

        }
    }


    var lineGraph = new Chart(ctx3, {
        type: 'line',
        data: {
            labels: month,
            datasets: [{
                label: 'Grocery',
                data: grocery,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'                    
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'                    
                ],
                borderWidth: 1
            },{
                label: 'Transportation & Gas',
                data: transport,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor:  [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            },{
                label: 'Entertainment',
                data: entertainment,
                backgroundColor: [                    
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            },{
                label: 'Loan & Other Payments',
                data: loan,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)'                    
                ],
                borderColor: [                    
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            },{
                label: 'Shopping',
                data: shopping,
                backgroundColor: [
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            
        },{
            label: 'Bills & Insurance',
            data: bill,
            backgroundColor: [
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        },{
            label: 'Restaurant & Dining',
            data: dine,
            backgroundColor: [
                'rgba(196, 249, 143, 0.2)'
            ],
            borderColor: [
                'rgba(196, 249, 143, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            }
        }
    });
}


