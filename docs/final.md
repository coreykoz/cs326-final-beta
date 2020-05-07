# BETA
## UWallet
## Spring 2020

### Overview
Our application, UWallet, is a personal finance application that is catered to the user. The user has control over setting budgets, adding and removing transactions, and multiple ways to view the user’s finances in various graphics.

How is this different from Mint?

### Team Members
*Corey Kozlovski (coreykoz)
*Dhruvi Vora (dhruvivora)
*Annapurna Jagasia (ajagasia)

### User Interface

### APIs
ADD BUDGET API

#### Overview
Using CRUD operations and RESTful APIs, UWallet is able to create JSON data based on a user’s input with information relating to personal finance. This data includes information on income, expenses, transaction history, budget, and monthly expenses. 

#### Income
##### Overview
 The Income API allows the user to input types of income they have into their account.  

##### URIs and Parameters
From the main.html page, the user can add sources of income through the Add Income button. From there, the user is prompted to input the following information. 

some-heroku-link.com/index.html

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


### Division of labor
Our original idea had multiple pages, so each of us designed one, and all three of us worked on parts of the main page. 
Write about milstone 2 and 3 and who did what

### Conclusion