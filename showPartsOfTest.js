const hideShowTime = 500;
var game1Data;
var game2Data;

window.document.addEventListener('showGame', handleEventShowGame, false);
window.document.addEventListener('showSecondForm', handleEventShowSecondForm, false);
window.document.addEventListener('showGameAgain', handleEventShowGameAgain, false);
window.document.addEventListener('showLastForm', handleEventShowLastForm, false);

$(".second-form").hide(); 
$("#html_embed_widget_11018").hide();  //Unity window
$(".third-form").hide();  



function handleEventShowGame(e) {
  $("#html_embed_widget_11018").show(hideShowTime);  //Unity window
  $(".first-form").hide(hideShowTime); 
  console.log(e.detail);
}

function handleEventShowSecondForm(e) {
  $("#html_embed_widget_11018").hide(hideShowTime);  //Unity window
  $(".second-form").show(hideShowTime); 
  console.log(e.detail);
  game1Data = JSON.parse(e.detail.gatheredData);
}

function handleEventShowGameAgain(e) {
  $("#html_embed_widget_11018").show(hideShowTime);  //Unity window
  $(".second-form").hide(hideShowTime); 
  console.log(e.detail);
}

function handleEventShowLastForm(e) {
  $("#html_embed_widget_11018").hide(hideShowTime);  //Unity window
  $(".third-form").show(hideShowTime);  
  console.log(e.detail);
  //game2Data = JSON.parse(e.detail.gatheredData);
}


//For testing
$("#showGame").click(function(){
    var data = { foo: 'showing game' }
    var event = new CustomEvent('showGame', { detail: data })
    window.document.dispatchEvent(event);
}); 

$("#ShowSecondForm").click(function(){
  var data = { foo: 'showing second form' }
  var event = new CustomEvent('showSecondForm', { detail: data })
  window.document.dispatchEvent(event);
}); 

$("#showGameAgain").click(function(){
  var data = { foo: 'showing game again' }
  var event = new CustomEvent('showGameAgain', { detail: data })
  //We tell the level to reload here
  window.document.dispatchEvent(event);
}); 

$("#showLastForm").click(function(){
  var data = { foo: 'showing last form' }
  var event = new CustomEvent('showLastForm', { detail: data })
  window.document.dispatchEvent(event);
}); 
