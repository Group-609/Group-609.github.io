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
  /*
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
  */
  
  const myurl = "https://coopgame.herokuapp.com/app.js";  
  $.ajax({
    method: 'GET',
    url: myurl,
    dataType: 'jsonp', //we use jsonp to hack around CORS limitations
    success: (res) => {
     var object = JSON.parse(res);
     alert(object.condition);
    }
  })
  /*
  $.get(url, function( data ) {
    alert( "Going to load the following condition:." + $(".result"));
  }, "json");
  
  $.getJSON("demo_ajax_json.js", function(result){
    $.each(result, function(i, field){
      alert( "Going to load the following condition:." + field);
    });
  });
  */
}
