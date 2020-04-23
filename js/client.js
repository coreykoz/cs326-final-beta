const url = "http://localhost:8080/counter"; // NOTE NEW URL



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


function addIncome(){
    (async () => {
        let incomeName = document.getElementById("incomeName").value;
        let incomeTotal = document.getElementById("incomeTotal").value;
        let incomeDate = document.getElementById("incomeDate").value;
        let incomeCategory = document.getElementById("incomeCategory").value;

        let data = { 'income_name': incomeName, 'income_total': incomeTotal, 'date': incomeDate, 'category': incomeCategory};
        addTransaction(data);
        const newURL = url + "/addIncome"; 
        const resp = await postData(newURL, data);
        const j = await resp.json();

        //modify later
	    if (j['result'] !== 'error') {
	        document.getElementById("output").innerHTML = "101: <b>" + userName + ", " + counterName + " created.</b>";
	    } else {
	        document.getElementById("output").innerHTML = "100: " + userName + ", " + counterName + " not found.</b>";
        }
        
	})();
}

function addExpense(){

}

function addTransaction(data){
    //reformat this data into our documentation verison of it
    //
}

function addMonthly(){
    //same as add income
}

function removeMonthly(){
    //similar to add income
}

function addUserInfo(){
    //same as add income
}