function insertData(message)
{
  window.alert("Inserting data into database");  
  const url = "https://coopgame.herokuapp.com/app.js";
  const data = {say: "hi", to:"mom"}

  $.post(url,data, function(data, status){
    console.log("${data} and status is ${status}")
  });
}

function addToGlobalScope()
{
  window.insertData = insertData;
  window.alert("Added test to global scope");    
}

