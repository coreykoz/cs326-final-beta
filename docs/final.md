# BETA
## UWallet
## Spring 2020

### Overview
Our application, UWallet, is a personal finance application that is catered to the user. The user has control over setting budgets, adding and removing monthly transactions, and multiple ways to view the user’s finances in various graphics. How is this different from Mint? Our application intends to streamline and iterate over what Mint currently accomplishes. To begin, Mint’s design and user interface is very cluttered and at times can be very restrictive of information due to having a lot of the information hidden under layers that the user has to click through. With our app, our first priority was making the user interface accessible and present the information in an upfront and clean way. Part of our design focused on feedback from criticisms of Mint users, one of which being how “hands-off” it is. Mint allows you to connect your bank accounts, credit cards, and other financial accounts for it to automatically.

### Team Members
* Corey Kozlovski (coreykoz)
* Dhruvi Vora (dhruvivora)
* Annapurna Jagasia (ajagasia)

### User Interface
* Home page: Users can see the bigger picture of their finances for the last few months, including a pie chart, bar plot, a scatter plot. On this page, they will also be able to view their entire transaction history and input a transaction be it an expense or an income. They can also input a monthly recurring expense such as rent or health insurance premiums. Users can also set a budget for various categories like shopping, entertainment, bills and insurance, restaurant and dining, etc. The bar plot should depict the category-wise budget set by the user as well as the total amount spent in each category. The line chart depicts the trend of spending over the past 6 months, split by category. The pie chart depicts the breakdown of spending in each category out of the user’s total expenses.

![homepage](/docs/images/homepage.JPG)

* Add Income pop-up: This pop-up allows users to submit details about an income such as the income name, amount, the date it was received, and the method it was received in (cash, check, direct deposit, gift). 

![income](/docs/images/incomepopup.JPG)

* Add Expense: This pop-up allows users to submit details about an expense such as the expense name, amount, date it was incurred, and the category of the expense (shopping, entertainment, bills and insurance, loans and other payments, etc). 

![expense](/docs/images/expensepopup.JPG)

* Edit Monthly Expense: This pop-up allows the user to edit, create, or delete a monthly recurring expense such as rent, health insurance premiums, utilities, etc.

![monthlyexpense](/docs/images/monthlyexpensespopup.JPG)

* Edit Budget: This pop-up allows the user to set a budget for each of the seven categories.

![budget](/docs/images/budgetpopup.JPG)

### APIs
ADD BUDGET API

#### Overview
Using CRUD operations and RESTful APIs, UWallet is able to create JSON data based on a user’s input with information relating to personal finance. This data includes information on income, expenses, transaction history, budget, and monthly expenses. 

#### Income
##### Overview
 The Income API allows the user to input types of income they have into their account.  

##### URIs and Parameters
From the main.html page, the user can add sources of income through the Add Income button. From there, the user is prompted to input the following information. 

https://cryptic-eyrie-49046.herokuapp.com/createIncome

| Parameter    | Description                                                                           | Example                         |
|--------------|---------------------------------------------------------------------------------------|---------------------------------|
| Income Name  | User inputs a name for the income transaction.                                        | { ‘income_name’: paycheck }     |
| Income Total | User inputs the amount of money being deposited.                                      | { ‘income_total’’ : 607}        |
| Date         | User inputs the date of the deposit.                                                  | { ‘date’: 04/22/2020}           |
| Category     | User picks the best fitting category the deposit falls under from a list of options.  | { ‘category’’: direct deposit } |
| Id           | This acts as an identifier for the type of data we’re dealing with.                   | { ‘id’ : “income”}              |


##### Responses
The income API will return the income data as a JSON object.



#### Expenses
##### Overview
The expense API allows the user to input types of expenses they have into their account.

##### URIs and Parameters
From main.html, the option to add an expense is through a button. This prompts the user to fill out the following fields.

some-heroku-link.com/index.html

| Parameter     | Description                                                         | Example                     |
|---------------|---------------------------------------------------------------------|-----------------------------|
| Expense name  | User-entered name of the expense that occured.                      | { ‘expense_name’ : fruits } |
| Expense total | Total amount of the expense as per user input.                      | { ‘expense_total’ : 27.50 } |
| Date          | The date that the expense incurred as entered by the user.          | { ‘date’ : 04/22/2020 }     |
| Category      | The category that the expense belongs to as determined by the user. | { ‘category’ : groceries }  |
| Id            | This acts as an identifier for the type of data we’re dealing with. | { ‘id’ : “expense”}         |   

##### Responses
The expenses API will return the expenses data as a JSON object.


#### Transaction History
##### Overview
 Transaction History’s API uses the data from both income and expenses to derive a master list of transactions to document history, display graphs, and calculate trends overall. 
##### URIs and Parameters
Transactions are only apparent on main.html. Transactions can not be modified directly, but can be modified through the income and expenses API. 

some-heroku-link.com/index.html

| Parameter        | Description                                                                                              | Example                                 |
|------------------|----------------------------------------------------------------------------------------------------------|-----------------------------------------|
| Transaction Name | Name of the transaction that occurred, derived from either Income or Expenses.                           | { ‘trans_name’ : example_transaction }  |
| Transaction Type | Type of transaction that occurred that is of 3 types: Income, Expense, or Monthly Expense.               | { ‘trans_type’ : expense }              |
| Category         | The category that the transaction belongs to, derived from either income, expenses, or monthly expenses. | { ‘trans_category’ : example_category } |
| Date             | The date in which the transaction occurred, derived from either income, expenses, or monthly expenses.   | { ‘trans_date’ : example_date}          |
| Price            | The price of the transaction. 								                                    	      | { ‘trans_price': example_price}		    |
| Id               | This acts as an identifier for the type of data we’re dealing with.                                      | { ‘id’ : “transaction"}                 |


##### Responses
The transaction history API will return the transaction history data as a JSON object. This response is generally used to calculate the graphs that are shown on main.html. 

#### Monthly Expenses
##### Overview
Monthly Expenses’s API uses the data from the user information’s survey alongside a button on the main page to create a master list of all transactions that reoccur monthly. Some examples of this could include rent, insurance, or loans. 

##### URIs and Parameters
From main.html, the user is able to input a transaction name alongside a price to add a monthly expense. The user is also able to remove past monthly expenses through this method.

some-heroku-link.com/index.html

| Parameter    | Description                                                                                                                        | Example                                |
|--------------|------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------|
| Expense Name | Name of given monthly expense. This is autofilled if given through the survey. If not through the survey, user input is required.  | { ‘monthly_expense’: example_expense } |
| Monthly Cost | Price of the given monthly expense. This input is required.                                                                        | { ‘monthly_cost’ : example_cost }      |
| Id           | This acts as an identifier for the type of data we’re dealing with.                                                                | { ‘id’ : “monthly”}                    |

##### Responses
The monthly expenses API will return the montly expense data as a JSON object.


### Database 
#### Transaction document
 ```json
 
 
    * id: "transaction" - string, the type of object it is
    * trans_category: "Transportation & Gas" - String, category of the transaction
    * trans_date: "2020-04-05" - String, data of the transaction
    * trans_name: "Uber" - String, name of the transaction
    * trans_price: "12.00" - String, price of the transaction
    * trans_type: "Expense" - String, type of transaction
    * _id: "5eb091c3b6fbfe46cecd9a63"
 
```
 
#### Expense document
```json 
 
    * category: "Shopping" - String, category of the expense
    * date: "2020-04-20" - String Date of expense
    * expense_name: "Shoes" - String, name of expense
    * expense_total: "4.20" - String, total in dollars of expense
    * id: "expense" - String, the type of object that it is
    * _id: "5eaca211b6fbfe46ce1241ac"
 
```
 
#### Income document
```json 
 
    * category: "Cash" - String, category of income
    * date: "2020-05-04"- String, date of income payment
    * id: "income" - String, the type of object
    * income_name: "Birthday Money" - String, name of the income transaction
    * income_total: "5.50" - String, the total in dollars
    * _id: "5eb08c8db6fbfe46cecb5c68"
 
```
 
#### Monthly Expense document
```json
 
    * id: "monthly"
    * monthly_expense: "Health Insurance"
    * monthly_cost: "20"
    * _id: "5eb08c8db6fbfe46cecb5c68"
 
```
 
#### Budget document
```json
 
    * id: "budget"
    * budget_category: "Entertainment"
    * budget_total: "20"
    * _id: "5eb08c8db6fbfe46cecb5c68"
```
 
 

### URL Routes/Mappings

| URL                                                         | Description                                                                                                                                                                                                                    |
|-------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| https://cryptic-eyrie-49046.herokuapp.com/read              | The read endpoint allows reading in data from the database for various items. These include income, expenses, transactions, monthly expenses, and budget information.                                                          |
| https://cryptic-eyrie-49046.herokuapp.com/createIncome      | The Create Income endpoint allows the user to input data (through a prompted text field) and create an income object.                                                                                                          |
| https://cryptic-eyrie-49046.herokuapp.com/createExpense     | The Create Expense endpoint allows the user to input data (through a prompted text field) and create an expense object.                                                                                                        |
| https://cryptic-eyrie-49046.herokuapp.com/createTransaction | The Create Transaction endpoint creates a transaction object and adds an income or expense to a table containing all incomes and expenses.                                                                                     |
| https://cryptic-eyrie-49046.herokuapp.com/updateMonthly     | The Update Monthly endpoint allows the user to input data (through a prompted text field) and update monthly expenses by putting in an monthly expense name and a monthly expense value.                                       |
| https://cryptic-eyrie-49046.herokuapp.com/updateBudget      | The Update Budget endpoint allows the user to input data (through a prompted text field) and update budgets by putting in a category name and a budget value. If a budget doesn’t exist for a category yet, it will create it. |
| https://cryptic-eyrie-49046.herokuapp.com/deleteMonthly     | The Delete Monthly endpoint allows users to delete a monthly expense by entering the monthly expense name and value and then pressing a delete button.                                                                         |
| https://cryptic-eyrie-49046.herokuapp.com/deleteBudget      | The Delete Budget endpoint allows users to delete a monthly expense by entering the category name and value and then pressing a delete button.                                                                                 |
### Division of labor
Our original idea had multiple pages, so each of us designed one, and all three of us worked on parts of the main page. 
Write about milstone 2 and 3 and who did what

### Conclusion
