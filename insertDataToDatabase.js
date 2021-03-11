function insertData(message)
{
  window.alert("Inserting data into database");  
  //Run script from backend - we cannot just run The run(message) here because this file is hosted in github and we need to send a request or sth to the backend website
  //run(message);
}

function addToGlobalScope()
{
  window.insertData = insertData;
  window.alert("Added test to global scope");    
}

