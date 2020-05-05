# BETA Milestone 3

## Database Documentation
Transaction document{
    id: "transaction" - string, the type of object it is
    trans_category: "Transportation & Gas" - String, category of the transaction
    trans_date: "2020-04-05" - String, data of the transaction
    trans_name: "Uber" - String, name of the transaction
    trans_price: "12.00" - String, price of the transaction
    trans_type: "Expense" - String, type of transaction
    _id: "5eb091c3b6fbfe46cecd9a63"
}

Expense document{
    category: "Shopping" - String, category of the expense
    date: "2020-04-20" - String, Date of expense
    expense_name: "Shoes" - String, name of expense
    expense_total: "4.20" - String, total in dollars of expense
    id: "expense" - String, the type of object that it is
    _id: "5eaca211b6fbfe46ce1241ac"
}

Income document{
    category: "Cash" - String, category of income
    date: "2020-05-04"- String, date of income payment
    id: "income" - String, the type of object
    income_name: "Birthday Money" - String, name of the income transaction
    income_total: "5.50" - String, the total in dollars
    _id: "5eb08c8db6fbfe46cecb5c68"
}

Still has to be implemented after we figure out user authentication
User{
    name: "Bob Ross" - String, first and last name of user
    email: "bob@umass.edu: - String, email of user
    age: "32" - String, age of user
    password: "example" - String, password of user for account
    id: "user" - String, the type of object
    _id: "5eb08c8db6fbfe46cecb5c68"
}
### Division of Labor
