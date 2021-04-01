var condition = "";
function insertData(message)
{    
  const url = "https://coopgame.herokuapp.com/app.js";
  const data = {say: "sent", to: message}
  $.post(url,data, function(data, status){
    console.log("${data} and status is ${status}")
  }); 
}
function getCondition()
{
  $.ajax({
    url:"https://coopgame.herokuapp.com/app.js",
    dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
    success:function(json){
        alert("Success: " + json.condition);
    },
    error:function(){
        alert("Error");
    }      
  });
  /*
  const url = "https://cors.io/?https://coopgame.herokuapp.com/app.js";  //CORS lets us do requests over different web pages
  $.get(url, function( data ) {
    $(".result").html( data );
    alert( "Going to load the following condition:." + condition);
  }, "text");
  */
}
