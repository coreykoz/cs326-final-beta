var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//const url = "https://cryptic-eyrie-49046.herokuapp.com/uwallet";
var url = "http://localhost:8080/uwallet";
//canvas for the graphs
var ctx = document.getElementById('monthySpending');
var ctx2 = document.getElementById('budget');
var ctx3 = document.getElementById('predictedSpending');
// NEW: helper method for posting data
function postData(url, data) {
    return __awaiter(this, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url, {
                        method: 'POST',
                        mode: 'cors',
                        cache: 'no-cache',
                        credentials: 'same-origin',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        redirect: 'follow',
                        body: JSON.stringify(data)
                    })];
                case 1:
                    resp = _a.sent();
                    return [2 /*return*/, resp];
            }
        });
    });
}
//CREATES
function createIncome() {
    var _this = this;
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var incomeName, incomeTotal, incomeDate, incomeCategory, data, newURL, resp, j;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    incomeName = document.getElementById("incomeName").value;
                    incomeTotal = document.getElementById("incomeTotal").value;
                    incomeDate = document.getElementById("incomeDate").value;
                    incomeCategory = document.getElementById("incomeCategory").value;
                    data = { 'income_name': incomeName, 'income_total': incomeTotal, 'date': incomeDate, 'category': incomeCategory, 'id': "income" };
                    newURL = url + "/createIncome";
                    return [4 /*yield*/, postData(newURL, data)];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 2:
                    j = _a.sent();
                    createTransaction(incomeName, incomeTotal, incomeDate, incomeCategory, "Income");
                    return [2 /*return*/];
            }
        });
    }); })();
}
function createExpense() {
    var _this = this;
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var expenseName, expenseTotal, expenseDate, expenseCategory, data, newURL, resp, j;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expenseName = document.getElementById("expenseName").value;
                    expenseTotal = document.getElementById("expenseTotal").value;
                    expenseDate = document.getElementById("expenseDate").value;
                    expenseCategory = document.getElementById("expenseCategory").value;
                    data = { 'expense_name': expenseName, 'expense_total': expenseTotal, 'date': expenseDate, 'category': expenseCategory, 'id': "expense" };
                    createTransaction(expenseName, expenseTotal, expenseDate, expenseCategory, "Expense");
                    newURL = url + "/createExpense";
                    return [4 /*yield*/, postData(newURL, data)];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 2:
                    j = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); })();
}
function createTransaction(name, total, date, cate, type) {
    var _this = this;
    //reformat this data into our documentation verison of it
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var id, data, newURL, resp, j;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = "transaction";
                    data = { 'trans_name': name, 'trans_price': total, 'trans_category': cate, 'trans_date': date, 'trans_type': type, 'id': id };
                    newURL = url + "/createTransaction";
                    return [4 /*yield*/, postData(newURL, data)];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 2:
                    j = _a.sent();
                    //modify later
                    if (j['result'] !== 'error') {
                        document.getElementById("trans_table").innerHTML = "<tr><td>" + name + "</td><td>" + type + "</td><td>" +
                            cate + "</td><td>" + date + "</td><td>" + total + "</td></tr>" + document.getElementById("trans_table").innerHTML;
                    }
                    else {
                        document.getElementById("output").innerHTML = name + " not found.";
                    }
                    return [2 /*return*/];
            }
        });
    }); })();
}
//READ IDs:
// transaction, expense, income, userInfo, monthly
function readTransaction() {
    return __awaiter(this, void 0, void 0, function () {
        var id, newURL, resp, j;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = { 'id': "transaction" };
                    newURL = url + "/read";
                    return [4 /*yield*/, postData(newURL, id)];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 2:
                    j = _a.sent();
                    if (j) {
                        return [2 /*return*/, j];
                    }
                    else {
                        return [2 /*return*/, "Error: Could not read"];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function readMonthly() {
    return __awaiter(this, void 0, void 0, function () {
        var id, newURL, resp, j;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = { 'id': "monthly" };
                    newURL = url + "/read";
                    return [4 /*yield*/, postData(newURL, id)];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 2:
                    j = _a.sent();
                    if (j) {
                        return [2 /*return*/, j];
                    }
                    else {
                        return [2 /*return*/, "Error: Could not read"];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function readIncome() {
    return __awaiter(this, void 0, void 0, function () {
        var id, newURL, resp, j;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = { 'id': "income" };
                    newURL = url + "/read";
                    return [4 /*yield*/, postData(newURL, id)];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 2:
                    j = _a.sent();
                    if (j) {
                        return [2 /*return*/, j];
                    }
                    else {
                        return [2 /*return*/, "Error: Could not read"];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function readExpense() {
    return __awaiter(this, void 0, void 0, function () {
        var id, newURL, resp, j;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = { 'id': "expense" };
                    newURL = url + "/read";
                    return [4 /*yield*/, postData(newURL, id)];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 2:
                    j = _a.sent();
                    if (j) {
                        return [2 /*return*/, j];
                    }
                    else {
                        return [2 /*return*/, "Error: Could not read"];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function readBudget() {
    return __awaiter(this, void 0, void 0, function () {
        var id, newURL, resp, j;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = { 'id': "budget" };
                    newURL = url + "/read";
                    return [4 /*yield*/, postData(newURL, id)];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 2:
                    j = _a.sent();
                    if (j) {
                        return [2 /*return*/, j];
                    }
                    else {
                        return [2 /*return*/, "Error: Could not read"];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// UPDATES
function updateMonthly() {
    return __awaiter(this, void 0, void 0, function () {
        var monthlyName, monthlyCost, newURL, data, resp, j;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    monthlyName = document.getElementById("monthlyName").value;
                    monthlyCost = document.getElementById("monthlyTotal").value;
                    newURL = url + "/updateMonthly";
                    data = { 'monthly_expense': monthlyName, 'monthly_cost': monthlyCost, 'id': "monthly" };
                    return [4 /*yield*/, postData(newURL, data)];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 2:
                    j = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function updateBudget() {
    return __awaiter(this, void 0, void 0, function () {
        var budgetCate, budgetTotal, newURL, data, resp, j;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    budgetCate = document.getElementById("budgetCategory").value;
                    budgetTotal = document.getElementById("budgetTotal").value;
                    newURL = url + "/updateBudget";
                    data = { 'budget_category': budgetCate, 'budget_total': budgetTotal, 'id': "budget" };
                    return [4 /*yield*/, postData(newURL, data)];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 2:
                    j = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// DELETES
function deleteMonthly() {
    var _this = this;
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var expenseName, data, newURL, resp, j;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expenseName = document.getElementById("monthlyName").value;
                    data = { 'expense_name': expenseName, 'id': "monthly" };
                    newURL = url + "/deleteMonthly";
                    return [4 /*yield*/, postData(newURL, data)];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 2:
                    j = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); })();
}
function deleteBudget() {
    var _this = this;
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var budgetCate, data, newURL, resp, j;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    budgetCate = document.getElementById("budgetCategory").value;
                    data = { 'budget_category': budgetCate, 'id': "budget" };
                    newURL = url + "/deleteBudget";
                    return [4 /*yield*/, postData(newURL, data)];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 2:
                    j = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); })();
}
// ALL DRAW FUNCTIONS:
// 1) call a read --> returns an array of documents (in JSON format)
// 2) process data and draw/create graphs
//Money formatter
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});
// Table - Should be calling readTransaction() and displaying results
function drawTransTable() {
    return __awaiter(this, void 0, void 0, function () {
        var array, i, name_1, type, cate, date, total;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readTransaction()];
                case 1:
                    array = _a.sent();
                    // [ {'name': "something", 'counter': 2} , {'name': "something", 'counter': 2}]
                    //  array[0].name = "something"
                    // array[0].counter = 2
                    //Sort by date, descending 
                    array.sort(function (a, b) {
                        //converts "2020-04-24" to "2020/04/24" and creates date obj
                        var date1 = new Date(a.trans_date.replace(/-/g, '/'));
                        var date2 = new Date(b.trans_date.replace(/-/g, '/'));
                        return date1.getTime() - date2.getTime();
                    });
                    //Draws each row of HTML based on sorted array
                    for (i = 0; i < array.length; i++) {
                        name_1 = array[i].trans_name;
                        type = array[i].trans_type;
                        cate = array[i].trans_category;
                        date = array[i].trans_date;
                        total = array[i].trans_price;
                        document.getElementById("trans_table").innerHTML = "<tr><td>" + name_1 + "</td><td>" + type + "</td><td>" +
                            cate + "</td><td>" + date + "</td><td>" + formatter.format(total) + "</td></tr>" + document.getElementById("trans_table").innerHTML;
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// Table - Should be calling readMonthly() and displaying results
function drawMonthlyTable() {
    return __awaiter(this, void 0, void 0, function () {
        var array, i, name_2, total;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    //reset table first
                    document.getElementById("monthly_table").innerHTML = "";
                    return [4 /*yield*/, readMonthly()];
                case 1:
                    array = _a.sent();
                    //Draws each row of HTML
                    for (i = 0; i < array.length; i++) {
                        name_2 = array[i].monthly_expense;
                        total = array[i].monthly_cost;
                        document.getElementById("monthly_table").innerHTML = "<tr><td>" + name_2 + "</td><td>" + formatter.format(total) + "</td></tr>" + document.getElementById("monthly_table").innerHTML;
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// Pie Chart - Should be calling readExpenses() and only using values from current month
function drawMonthlySpendingByCateGraph() {
    return __awaiter(this, void 0, void 0, function () {
        var array, currDate, currMonth, groceryTotal, transportTotal, entertainmentTotal, loanTotal, shoppingTotal, billTotal, dineTotal, i, allCategory, pieChart;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readExpense()];
                case 1:
                    array = _a.sent();
                    currDate = new Date();
                    currMonth = currDate.getMonth();
                    groceryTotal = 0;
                    transportTotal = 0;
                    entertainmentTotal = 0;
                    loanTotal = 0;
                    shoppingTotal = 0;
                    billTotal = 0;
                    dineTotal = 0;
                    for (i = 0; i < array.length; i++) {
                        if (new Date(array[i].date.replace(/-/g, '/')).getMonth() == currMonth) {
                            //get category and price
                            if (array[i].category == "Grocery") {
                                groceryTotal += parseFloat(array[i].expense_total);
                            }
                            else if (array[i].category == "Transportation & Gas") {
                                transportTotal += parseFloat(array[i].expense_total);
                            }
                            else if (array[i].category == "Entertainment") {
                                entertainmentTotal += parseFloat(array[i].expense_total);
                            }
                            else if (array[i].category == "Loans & Other Payments") {
                                loanTotal += parseFloat(array[i].expense_total);
                            }
                            else if (array[i].category == "Shopping") {
                                shoppingTotal += parseFloat(array[i].expense_total);
                            }
                            else if (array[i].category == "Bills & Insurance") {
                                billTotal += parseFloat(array[i].expense_total);
                            }
                            else if (array[i].category == "Restaurant & Dining") {
                                dineTotal += parseFloat(array[i].expense_total);
                            }
                            else {
                            }
                        }
                    }
                    allCategory = [["Grocery", groceryTotal], ["Transportation & Gas", transportTotal], ["Entertainment", entertainmentTotal], ["Loans & Other Payments", loanTotal], ["Shopping", shoppingTotal], ["Bills & Insurance", billTotal], ["Restaurant & Dining", dineTotal]];
                    //display this array
                    console.log(allCategory);
                    pieChart = new Chart(ctx, {
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
                    return [2 /*return*/];
            }
        });
    });
}
function totalAvailable() {
    return __awaiter(this, void 0, void 0, function () {
        var expenses, income, expenseTotal, incomeTotal, i, i, remaining;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readExpense()];
                case 1:
                    expenses = _a.sent();
                    return [4 /*yield*/, readIncome()];
                case 2:
                    income = _a.sent();
                    expenseTotal = 0;
                    incomeTotal = 0;
                    for (i = 0; i < expenses.length; i++) {
                        expenseTotal += parseFloat(expenses[i].expense_total);
                    }
                    for (i = 0; i < income.length; i++) {
                        incomeTotal += parseFloat(income[i].income_total);
                    }
                    remaining = (expenseTotal - incomeTotal).toFixed(2);
                    remaining.toString();
                    if (expenseTotal > incomeTotal) {
                        document.getElementById("totalMoney").innerHTML = "-" + remaining;
                    }
                    else {
                        document.getElementById("totalMoney").innerHTML = "" + remaining;
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// Bar Chart - Should be calling readExpenses() - have one array hold all docs from readExpenses() for current month and another for the rest
//                                                we'll calculate budget based on avg spending? Or we could have more data (inside userInfo or a separate data structure)
//                                                that allows input for budget
function drawBudgetGraph() {
    return __awaiter(this, void 0, void 0, function () {
        var array, expense, budgetArray, expenseArray, i, i, mixedChart;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readBudget()];
                case 1:
                    array = _a.sent();
                    return [4 /*yield*/, readExpense()];
                case 2:
                    expense = _a.sent();
                    budgetArray = [0, 0, 0, 0, 0, 0, 0];
                    expenseArray = [0, 0, 0, 0, 0, 0, 0];
                    for (i = 0; i < array.length; i++) {
                        if (array[i].budget_category == "Grocery") {
                            budgetArray[0] = parseFloat(array[i].budget_total);
                        }
                        else if (array[i].budget_category == "Transportation & Gas") {
                            budgetArray[1] = parseFloat(array[i].budget_total);
                        }
                        else if (array[i].budget_category == "Entertainment") {
                            budgetArray[2] = parseFloat(array[i].budget_total);
                        }
                        else if (array[i].budget_category == "Loan & Other Payments") {
                            budgetArray[3] = parseFloat(array[i].budget_total);
                        }
                        else if (array[i].budget_category == "Shopping") {
                            budgetArray[4] = parseFloat(array[i].budget_total);
                        }
                        else if (array[i].budget_category == "Bills & Insurance") {
                            budgetArray[5] = parseFloat(array[i].budget_total);
                        }
                        else if (array[i].budget_category == "Restaurant & Dining") {
                            budgetArray[6] = parseFloat(array[i].budget_total);
                        }
                        else {
                        }
                    }
                    for (i = 0; i < expense.length; i++) {
                        if (expense[i].category == "Grocery") {
                            expenseArray[0] += parseFloat(expense[i].expense_total);
                        }
                        else if (expense[i].category == "Transportation & Gas") {
                            expenseArray[1] += parseFloat(expense[i].expense_total);
                        }
                        else if (expense[i].category == "Entertainment") {
                            expenseArray[2] += parseFloat(expense[i].expense_total);
                        }
                        else if (expense[i].category == "Loans & Other Payments") {
                            expenseArray[3] += parseFloat(expense[i].expense_total);
                        }
                        else if (expense[i].category == "Shopping") {
                            expenseArray[4] += parseFloat(expense[i].expense_total);
                        }
                        else if (expense[i].category == "Bills & Insurance") {
                            expenseArray[5] += parseFloat(expense[i].expense_total);
                        }
                        else if (expense[i].category == "Restaurant & Dining") {
                            expenseArray[6] += parseFloat(expense[i].expense_total);
                        }
                        else {
                        }
                    }
                    console.log(expenseArray);
                    mixedChart = new Chart(ctx2, {
                        type: 'bar',
                        data: {
                            datasets: [{
                                    label: 'Spending',
                                    data: expenseArray,
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)'
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)'
                                    ],
                                    borderWidth: 1
                                }, {
                                    label: 'Budget',
                                    data: budgetArray,
                                    backgroundColor: [
                                        'rgba(75, 192, 192, 0.2)'
                                    ],
                                    borderColor: [
                                        'rgba(75, 192, 192, 1)'
                                    ],
                                    borderWidth: 1,
                                    // Changes this dataset to become a line
                                    type: 'bar'
                                }],
                            labels: ['Grocery', 'Transportation & Gas', 'Entertainment', 'Loan & Other Payments', 'Shopping', 'Bills & Insurance', 'Restaurant & Dining']
                        },
                        options: { scales: {
                                xAxes: [{ stacked: true }],
                                yAxes: [{
                                        ticks: {
                                            beginAtZero: true
                                        },
                                        stacked: false
                                    }]
                            }
                        }
                    });
                    return [2 /*return*/];
            }
        });
    });
}
// Table - Should be calling readExpenses() and putting top 3-5 values (total spent wise) on table
function drawMostPopSpendingTable() {
    return __awaiter(this, void 0, void 0, function () {
        var array, groceryTotal, transportTotal, entertainmentTotal, loanTotal, shoppingTotal, billTotal, dineTotal, i, allCategory, i, str;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readExpense()];
                case 1:
                    array = _a.sent();
                    groceryTotal = 0;
                    transportTotal = 0;
                    entertainmentTotal = 0;
                    loanTotal = 0;
                    shoppingTotal = 0;
                    billTotal = 0;
                    dineTotal = 0;
                    //reset table
                    document.getElementById("popspend_table").innerHTML = "";
                    for (i = 0; i < array.length; i++) {
                        if (array[i].category == "Grocery") {
                            groceryTotal += parseFloat(array[i].expense_total);
                        }
                        else if (array[i].category == "Transportation & Gas") {
                            transportTotal += parseFloat(array[i].expense_total);
                        }
                        else if (array[i].category == "Entertainment") {
                            entertainmentTotal += parseFloat(array[i].expense_total);
                        }
                        else if (array[i].category == "Loans & Other Payments") {
                            loanTotal += parseFloat(array[i].expense_total);
                        }
                        else if (array[i].category == "Shopping") {
                            shoppingTotal += parseFloat(array[i].expense_total);
                        }
                        else if (array[i].category == "Bills & Insurance") {
                            billTotal += parseFloat(array[i].expense_total);
                        }
                        else if (array[i].category == "Restaurant & Dining") {
                            dineTotal += parseFloat(array[i].expense_total);
                        }
                        else {
                        }
                    }
                    allCategory = [["Grocery", groceryTotal], ["Transportation & Gas", transportTotal], ["Entertainment", entertainmentTotal], ["Loans & Other Payments", loanTotal], ["Shopping", shoppingTotal], ["Bills & Insurance", billTotal], ["Restaurant & Dining", dineTotal]];
                    allCategory.sort(function (a, b) {
                        return a[1] - b[1];
                    });
                    //Draws each row of HTML
                    for (i = 0; i < allCategory.length; i++) {
                        str = allCategory[i][1];
                        document.getElementById("popspend_table").innerHTML = "<tr><td>" + allCategory[i][0] + "</td><td>" + formatter.format(str) + "</td></tr>" + document.getElementById("popspend_table").innerHTML;
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// Line Graph - forget what this one does, anna input? shows the monthly trend filtered down by category
function drawLineGraph() {
    return __awaiter(this, void 0, void 0, function () {
        var array, month, grocery, transport, entertainment, loan, shopping, bill, dine, i, date, date, date, date, date, date, date, lineGraph;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readExpense()];
                case 1:
                    array = _a.sent();
                    month = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];
                    grocery = [0, 0, 0, 0, 0, 0];
                    transport = [0, 0, 0, 0, 0, 0];
                    entertainment = [0, 0, 0, 0, 0, 0];
                    loan = [0, 0, 0, 0, 0, 0];
                    shopping = [0, 0, 0, 0, 0, 0];
                    bill = [0, 0, 0, 0, 0, 0];
                    dine = [0, 0, 0, 0, 0, 0];
                    array.sort(function (a, b) {
                        //converts "2020-04-24" to "2020/04/24" and creates date obj
                        var date1 = new Date(a.date.replace(/-/g, '/'));
                        var date2 = new Date(b.date.replace(/-/g, '/'));
                        return date1.getTime() - date2.getTime();
                    });
                    for (i = 0; i < array.length; i++) {
                        if (array[i].category == "Grocery") {
                            date = new Date(array[i].date.replace(/-/g, '/'));
                            grocery[date.getMonth() + 1] = grocery[date.getMonth() + 1] + parseFloat(array[i].expense_total);
                        }
                        else if (array[i].category == "Transportation & Gas") {
                            date = new Date(array[i].date.replace(/-/g, '/'));
                            transport[date.getMonth() + 1] = transport[date.getMonth() + 1] + parseFloat(array[i].expense_total);
                        }
                        else if (array[i].category == "Entertainment") {
                            date = new Date(array[i].date.replace(/-/g, '/'));
                            entertainment[date.getMonth() + 1] = entertainment[date.getMonth() + 1] + parseFloat(array[i].expense_total);
                        }
                        else if (array[i].category == "Loans & Other Payments") {
                            date = new Date(array[i].date.replace(/-/g, '/'));
                            loan[date.getMonth() + 1] = loan[date.getMonth() + 1] + parseFloat(array[i].expense_total);
                        }
                        else if (array[i].category == "Shopping") {
                            date = new Date(array[i].date.replace(/-/g, '/'));
                            shopping[date.getMonth() + 1] = shopping[date.getMonth() + 1] + parseFloat(array[i].expense_total);
                        }
                        else if (array[i].category == "Bills & Insurance") {
                            date = new Date(array[i].date.replace(/-/g, '/'));
                            bill[date.getMonth() + 1] = bill[date.getMonth() + 1] + parseFloat(array[i].expense_total);
                        }
                        else if (array[i].category == "Restaurant & Dining") {
                            date = new Date(array[i].date.replace(/-/g, '/'));
                            dine[date.getMonth() + 1] = dine[date.getMonth() + 1] + parseFloat(array[i].expense_total);
                        }
                        else {
                        }
                    }
                    lineGraph = new Chart(ctx3, {
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
                                        'rgba(255, 99, 132, 1)'
                                        //'rgba(54, 162, 235, 1)'
                                        //'rgba(255, 206, 86, 1)',
                                        //'rgba(75, 192, 192, 1)',
                                        //'rgba(153, 102, 255, 1)',
                                        //'rgba(255, 159, 64, 1)'
                                    ],
                                    borderWidth: 1
                                }, {
                                    label: 'Transportation & Gas',
                                    data: transport,
                                    backgroundColor: [
                                        'rgba(54, 162, 235, 0.2)'
                                        /*'rgba(255, 99, 132, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                        'rgba(255, 159, 64, 0.2)',
                                        'rgba(196, 249, 143, 0.2)'*/
                                    ],
                                    borderColor: [
                                        'rgba(54, 162, 235, 1)'
                                        //'rgba(255, 99, 132, 1)',
                                        //'rgba(255, 206, 86, 1)',
                                        //'rgba(75, 192, 192, 1)',
                                        //'rgba(153, 102, 255, 1)',
                                        //'rgba(255, 159, 64, 1)',
                                        //'rgba(196, 249, 143, 1)'
                                    ],
                                    borderWidth: 1
                                }, {
                                    label: 'Entertainment',
                                    data: entertainment,
                                    backgroundColor: [
                                        //'rgba(255, 99, 132, 0.2)'
                                        //'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)'
                                        //'rgba(75, 192, 192, 0.2)',
                                        //'rgba(153, 102, 255, 0.2)',
                                        //'rgba(255, 159, 64, 0.2)'
                                    ],
                                    borderColor: [
                                        //'rgba(255, 99, 132, 1)'
                                        //'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)'
                                        //'rgba(75, 192, 192, 1)',
                                        //'rgba(153, 102, 255, 1)',
                                        //'rgba(255, 159, 64, 1)'
                                    ],
                                    borderWidth: 1
                                }, {
                                    label: 'Loan & Other Payments',
                                    data: loan,
                                    backgroundColor: [
                                        //'rgba(255, 99, 132, 0.2)',
                                        //'rgba(54, 162, 235, 0.2)',
                                        //'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)'
                                        //'rgba(153, 102, 255, 0.2)',
                                        //'rgba(255, 159, 64, 0.2)'
                                    ],
                                    borderColor: [
                                        //'rgba(255, 99, 132, 1)',
                                        //'rgba(54, 162, 235, 1)',
                                        //'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)'
                                        //'rgba(153, 102, 255, 1)',
                                        //'rgba(255, 159, 64, 1)'
                                    ],
                                    borderWidth: 1
                                }, {
                                    label: 'Shopping',
                                    data: shopping,
                                    backgroundColor: [
                                        //'rgba(255, 99, 132, 0.2)',
                                        //'rgba(54, 162, 235, 0.2)',
                                        //'rgba(255, 206, 86, 0.2)',
                                        //'rgba(75, 192, 192, 0.2)',
                                        'rgba(153, 102, 255, 0.2)'
                                        //'rgba(255, 159, 64, 0.2)'
                                    ],
                                    borderColor: [
                                        //'rgba(255, 99, 132, 1)',
                                        //'rgba(54, 162, 235, 1)',
                                        //'rgba(255, 206, 86, 1)',
                                        //'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)'
                                        //'rgba(255, 159, 64, 1)'
                                    ],
                                    borderWidth: 1
                                }, {
                                    label: 'Bills & Insurance',
                                    data: bill,
                                    backgroundColor: [
                                        //'rgba(255, 99, 132, 0.2)',
                                        //'rgba(54, 162, 235, 0.2)',
                                        //'rgba(255, 206, 86, 0.2)',
                                        //'rgba(75, 192, 192, 0.2)',
                                        //'rgba(153, 102, 255, 0.2)',
                                        'rgba(255, 159, 64, 0.2)'
                                    ],
                                    borderColor: [
                                        //'rgba(255, 99, 132, 1)',
                                        //'rgba(54, 162, 235, 1)',
                                        //'rgba(255, 206, 86, 1)',
                                        //'rgba(75, 192, 192, 1)',
                                        //'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)'
                                    ],
                                    borderWidth: 1
                                }, {
                                    label: 'Restaurant & Dining',
                                    data: dine,
                                    backgroundColor: [
                                        /*'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                        'rgba(255, 159, 64, 0.2)'*/
                                        'rgba(196, 249, 143, 0.2)'
                                    ],
                                    borderColor: [
                                        /*'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)'*/
                                        'rgba(196, 249, 143, 1)'
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
                    return [2 /*return*/];
            }
        });
    });
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
