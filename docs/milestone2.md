# BETA Milestone 1

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

#### Responses
The user API will return the survey data as a JSON object. 

