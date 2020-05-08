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

#### Read API
__Overview__: The read endpoint allows reading in data from the database for various items. These include income, expenses, transactions, monthly expenses, and budget information.

__Endpoint URI and Parameters__:
https://cryptic-eyrie-49046.herokuapp.com/read

| Parameter | Description	 					                                                            | Example 	                                              |
|-----------|-----------------------------------------------------------------------------------------------|---------------------------------------------------------|
| id	    | Type of data to be read, either “transaction”, “expense”, “income”, “monthly”, or “budget”	| postData(“/read”, {'id':"transaction"}) → readHandler() |


__Responses__:
The read API returns the data as an array of JSON objects. 

| Key		    | Value Type | Description	                                    |
|---------------|------------|--------------------------------------------------|
| result 		| Array	     | Array of JSON objects that fulfill the given id	|


#### Create Income API
__Overview__: The Create Income endpoint allows the user to input data (through a prompted text field) and create an income object.

__Endpoint URI and Parameters__:
https://cryptic-eyrie-49046.herokuapp.com/createIncome

| Parameter       | Description                                                         |
|-----------------|---------------------------------------------------------------------|
| Income_name     | Name of income.                                                     |
| Income_total    | Total amount of income to be deposited.                             |
| Date            | Date of transaction.                                                |
| Category        | Selected category that the input fulfills from a pre-selected list. |

__Responses__:
This API returns all the response data as a JSON object, formatted below:

| Key         | Value Type | Description             |
|-------------|------------|-------------------------|
| result      | string     | Operation status.       |
| income_name | string     | Name of created Income. |


#### Create Expense API
__Overview__: The Create Expense endpoint allows the user to input data (through a prompted text field) and create an expense object.

__Endpoint URI and Parameters__:
https://cryptic-eyrie-49046.herokuapp.com/createExpense

| Parameter        | Description                                                                       |
|------------------|-----------------------------------------------------------------------------------|
| Expense_name     | Name of expense.                                                                  |
| Expense_otal     | Total amount of expense to be recorded.                                           |
| Date             | Date of transaction.                                                              |
| Category         | Selected category from a pre-selected list that best suits the given transaction. |
| Id               | Internal ID used to keep track of different types of documents.	               | 

__Responses__:
This API returns all the response data as a JSON object, formatted below:

| Key          | Value Type | Description              |
|--------------|------------|--------------------------|
| result       | string     | Operation status.        |
| expense_name | string     | Name of created expense. |



#### Create Transaction API
__Overview__: The Create Transaction endpoint creates a transaction object and adds an income or expense to a table containing all incomes and expenses. 

__Endpoint URI and Parameters__:
https://cryptic-eyrie-49046.herokuapp.com/createTransaction

| Parameter            | Description                                                                       |
|----------------------|-----------------------------------------------------------------------------------|
| Trans_Name           | Name of Transaction.                                                              |
| Trans_Price          | Total amount of transaction to be recorded.                                       |
| Trans_Date           | Date of transaction.                                                              |
| Trans_Category       | Selected category from a pre-selected list that best suits the given transaction. |
| Trans_Type           | Type of transaction, either "expense" or "income".                                |
| Id                   | Internal ID used to keep track of different types of documents.                   |


__Responses__:
This API returns all the response data as a JSON object, formatted below:

| Key        | Value Type | Description                  |
|------------|------------|------------------------------|
| result     | string     | Operation status.            |
| trans_name | string     | Name of created transaction. |


#### Update Monthly API
__Overview__: The Update Monthly endpoint allows the user to input data (through a prompted text field) and update monthly expenses by putting in an monthly expense name and a monthly expense value.

__Endpoint URI and Parameters__:
https://cryptic-eyrie-49046.herokuapp.com/updateMonthly

| Parameter    | Description              |
|--------------|--------------------------|
| Monthly_Expense| Name of Monthly Expense. |
| Monthly_Cost | Amount of Monthly Cost.  |

__Responses__:
This API returns all the response data as a JSON object, formatted below:

| Key    | Value Type | Description                               |
|--------|------------|-------------------------------------------|
| result | string     | Operation status.                         |
| name   | string     | Name of Monthly expense updated.          |
| value  | string     | Cost of Monthly expense that was updated. |


#### Update Budget API
__Overview__: The Update Budget endpoint allows the user to input data (through a prompted text field) and update budgets by putting in a category name and a budget value. If a budget doesn’t exist for a category yet, it will create it.

__Endpoint URI and Parameters__:
https://cryptic-eyrie-49046.herokuapp.com/updateBudget

| Parameter       | Description                       |
|-----------------|-----------------------------------|
| Budget_Category | Category that this budget is for. |
| Budget_Total    | Set amount of budget.             |

__Responses__:
This API returns all the response data as a JSON object, formatted below:

| Key    | Value Type | Description                       |
|--------|------------|-----------------------------------|
| result | string     | Operation status.                 |
| name   | string     | Name of budget updated.           |
| value  | string     | Price of budget that was updated. |



#### Delete Monthly API
__Overview__: The Delete Monthly API allows users to delete a monthly expense by entering the monthly expense name and value and then pressing a delete button.

__Endpoint URI and Parameters__:
https://cryptic-eyrie-49046.herokuapp.com/deleteMonthly
| Parameter       | Description                                            |
|-----------------|--------------------------------------------------------|
| Monthly_Expense | Name of monthly expense that is desired to be deleted. |


__Responses__:
This API returns all the response data as a JSON object, formatted below:

| Key    | Value Type | Description                      |
|--------|------------|----------------------------------|
| result | string     | Operation status.                |
| value  | string     | Name of Monthly Expense deleted. |


#### Delete Budget API
__Overview__: The Delete Budget API allows users to delete a monthly expense by entering the category name and value and then pressing a delete button.

__Endpoint URI and Parameters__:
https://cryptic-eyrie-49046.herokuapp.com/deleteBudget

| Parameter       | Description                                    |
|-----------------|------------------------------------------------|
| Budget_Category | Category in which the budget is to be deleted. |


__Responses__:
This API returns all the response data as a JSON object, formatted below:

| Key    | Value Type | Description                      |
|--------|------------|----------------------------------|
| result | string     | Operation status.                |
| value  | string     | Name of budget deleted. |



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
In planning our wireframes, our group worked collaboratively over zoom call and simultaneously worked on Whimsical. Our original idea had multiple pages, so each of us designed one independently(login.html, survey.html, create-acc.html) , and all three of us worked on parts of the index.html page. We all collaboratively worked on any additional CSS required, and the javascript required in creating the charts. Annapurna worked on implementing a lot of the Chart.js parts. 
For the API planning, we all simultaneously worked together on a Google Doc and a Zoom call, and once we were done, one of us edited the md file. We all went through the code together over a Zoom while primarily one person was typing for a specific section. We did  switch around who was typing for different sections, but we found it easier to have one person type while everyone was online together at the same time to discuss changes. We ended up implementing our database functions at this point. 	
Since we had previously implemented our database structure and functionality, we then put the data structure documentation on a Google doc that we collaborated on while being on a Zoom call, and had one of the members move it to a markdown and format accordingly. Then, Corey set up our MongoDB, secrets.json, and heroku password. Since our original idea included a survey that would personalize the home screen, and we did not have a way of implementing user authentication, we came up with a new idea to introduce a budgeting portion to our project. Dhruvi and Annapurna added the graph functionality while Corey added functionality for the Budget portion.


### Conclusion
Our team had an interesting time working on this project. We learned what it takes to fully implement a working website with our own database. Most of our difficulties arrived with milestone 2, where we had to start implementing our front-end. The API planning went well, but we had a hard time implementing our front-end because we didn’t understand how to do it fully. We ended up implementing both front and back end functionality in the same milestone without realizing it. We didn’t completely understand what milestone 2 was asking us to do.

Another hurdle we had was working in a group in general. We were constantly trying to make sure that everyone was getting an equal share of work, but sometimes it was easier for one person to share their screen while we were on a zoom call and work collaboratively that way. 

We would’ve liked to know about the SQL databases before the MongoDB because after being introduced to it much later, we prefered SQL but ended up using MongoDB because we had already started implementing that. 

Additionally, a major part of our website’s functionality depended on user accounts which we weren’t able to implement so we decided to add more functions like adding budgets to the categories and displaying them on the bar graph. 