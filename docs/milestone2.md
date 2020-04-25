# BETA Milestone 2

## API Documentation for UWallet

### Overview
Using CRUD operations and RESTful APIs, UWallet is able to create JSON data based on a user’s input with information relating to personal finance. This data includes information on user information, income, expenses, transaction history, and monthly expenses. 

### User Information
#### Overview
The User Information API allows the user to input personal information alongside survey question answers that are specific to that user to customize the experience for them. 
#### URIs and Parameters
The create-acc.html page is accessed through our initial login page (index.html). Once the create-acc.html page has been filled, the user is directed to survey.html automatically. 


some-heroku-link.com/create-acc.html
some-heroku-link.com/survey.html

| Parameter         | Description                                                         | Example                          |
|-------------------|---------------------------------------------------------------------|----------------------------------|
| First & Last Name | User’s first and last name for account creation.                    | { ‘name’: example_name }         |
| Email Address     | User’s email address for account creation.                          | { ‘email’ : example_email }      |
| Age               | User’s age used to personalize the application for the user.        | { ‘age’: example_age }           |
| Password          | User’s private password to keep their personal information secure.  | { ‘password’: example_password } |
| Id                 | This acts as an identifier for the type of data we’re dealing with.| { ‘id’ : “user”}                 |


#### Responses
The user API will return the survey data as a JSON object. 

### Income
#### Overview
 The Income API allows the user to input types of income they have into their account.  

#### URIs and Parameters
From the main.html page, the user can add sources of income through the Add Income button. From there, the user is prompted to input the following information. 

some-heroku-link.com/main.html

| Parameter    | Description                                                                           | Example                         |
|--------------|---------------------------------------------------------------------------------------|---------------------------------|
| Income Name  | User inputs a name for the income transaction.                                        | { ‘income_name’: paycheck }     |
| Income Total | User inputs the amount of money being deposited.                                      | { ‘income_total’’ : 607}        |
| Date         | User inputs the date of the deposit.                                                  | { ‘date’: 04/22/2020}           |
| Category     | User picks the best fitting category the deposit falls under from a list of options.  | { ‘category’’: direct deposit } |
| Id           | This acts as an identifier for the type of data we’re dealing with.                   | { ‘id’ : “income”}              |


#### Responses
The income API will return the income data as a JSON object.

### Expenses
#### Overview
The expense API allows the user to input types of expenses they have into their account.

#### URIs and Parameters
From main.html, the option to add an expense is through a button. This prompts the user to fill out the following fields.

some-heroku-link.com/main.html

| Parameter     | Description                                                         | Example                     |
|---------------|---------------------------------------------------------------------|-----------------------------|
| Expense name  | User-entered name of the expense that occured.                      | { ‘expense_name’ : fruits } |
| Expense total | Total amount of the expense as per user input.                      | { ‘expense_total’ : 27.50 } |
| Date          | The date that the expense incurred as entered by the user.          | { ‘date’ : 04/22/2020 }     |
| Category      | The category that the expense belongs to as determined by the user. | { ‘category’ : groceries }  |
| Id            | This acts as an identifier for the type of data we’re dealing with. | { ‘id’ : “expense”}         |   

#### Responses
The expenses API will return the expenses data as a JSON object.


### Transaction History
#### Overview
 Transaction History’s API uses the data from both income and expenses to derive a master list of transactions to document history, display graphs, and calculate trends overall. 
#### URIs and Parameters
Transactions are only apparent on main.html. Transactions can not be modified directly, but can be modified through the income and expenses API. 

some-heroku-link.com/main.html

| Parameter        | Description                                                                                              | Example                                 |
|------------------|----------------------------------------------------------------------------------------------------------|-----------------------------------------|
| Transaction Name | Name of the transaction that occurred, derived from either Income or Expenses.                           | { ‘trans_name’ : example_transaction }  |
| Transaction Type | Type of transaction that occurred that is of 3 types: Income, Expense, or Monthly Expense.               | { ‘trans_type’ : expense }              |
| Category         | The category that the transaction belongs to, derived from either income, expenses, or monthly expenses. | { ‘trans_category’ : example_category } |
| Date             | The date in which the transaction occurred, derived from either income, expenses, or monthly expenses.   | { ‘trans_date’ : example_date}          |
| Price            | The price of the transaction. 								                                    	      | { ‘trans_price': example_price}		    |
| Id               | This acts as an identifier for the type of data we’re dealing with.                                      | { ‘id’ : “transaction"}                 |


#### Responses
The transaction history API will return the transaction history data as a JSON object. This response is generally used to calculate the graphs that are shown on main.html. 

### Monthly Expenses
#### Overview
Monthly Expenses’s API uses the data from the user information’s survey alongside a button on the main page to create a master list of all transactions that reoccur monthly. Some examples of this could include rent, insurance, or loans. 

#### URIs and Parameters
From main.html, the user is able to input a transaction name alongside a price to add a monthly expense. The user is also able to remove past monthly expenses through this method.
From survey.html, the user answers the questions and is prompted to fill out said monthly expenses if applicable. 

some-heroku-link.com/main.html
some-heroku-link.com/survey.html

| Parameter    | Description                                                                                                                        | Example                                |
|--------------|------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------|
| Expense Name | Name of given monthly expense. This is autofilled if given through the survey. If not through the survey, user input is required.  | { ‘monthly_expense’: example_expense } |
| Monthly Cost | Price of the given monthly expense. This input is required.                                                                        | { ‘monthly_cost’ : example_cost }      |
| Id           | This acts as an identifier for the type of data we’re dealing with.                                                                | { ‘id’ : “monthly”}                    |

#### Responses
The monthly expenses API will return the montly expense data as a JSON object.

### Heroku
Heroku URL: https://cryptic-eyrie-49046.herokuapp.com/

### CRUD
Quick Note: To see changes, you must refresh the page. We're planning on fixing this soon. 

#### Create
![create](/docs/images/create_1.PNG)
Here we filled out the Income portion, where we intend to create a new Income document and send the data to a server. The results are displayed in the next section, Read.

#### Read
![read](/docs/images/read_1.PNG)
Here, we can read the new Income we previously added once we refresh the page. 

#### Update
![update](/docs/images/update_1.PNG)
Here we intend to update the Monthly Expense "Health Insurance", and change its price to 20. We open the prompt and fill in the following:
![update](/docs/images/update_2.PNG)

Once we submit and refresh, we get the following:
![update](/docs/images/update_3.PNG)

#### Delete
![delete](/docs/images/delete_1.PNG)
Here we intend to delete "Health Insurance" from Monthly Expenses. We open the prompt and fill in the requirements.
![delete](/docs/images/delete_2.PNG)
On submission and refresh, the "Health Insurance" portion is gone. 

### Division of Labor
For the API planning, we all simulateouly worked together on a Google Doc and a Zoom call, and once we were done, one of us edited the md file. 
