window.document.addEventListener('showGame', handleEventShowGame, false);
window.document.addEventListener('showSecondForm', handleEventShowSecondForm, false);
window.document.addEventListener('showGameAgain', handleEventShowGameAgain, false);
window.document.addEventListener('showLastForm', handleEventShowLastForm, false);

$(".second-form").hide(); 
$("#html_embed_widget_11018").hide();  //Unity window
$(".third-form").hide();  



function handleEventShowGame(e) {
  $("#html_embed_widget_11018").show();  //Unity window
  $(".first-form").hide(); 
  console.log(e.detail);
}

function handleEventShowSecondForm(e) {
  $("#html_embed_widget_11018").hide();  //Unity window
  $(".second-form").show(); 
  console.log(e.detail);
}

function handleEventShowGameAgain(e) {
  $("#html_embed_widget_11018").show();  //Unity window
  $(".second-form").hide(); 
  console.log(e.detail);
}

function handleEventShowLastForm(e) {
  $("#html_embed_widget_11018").hide();  //Unity window
  $(".third-form").show();  
  console.log(e.detail);
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
  var data = { foo: 'showing second form' }
  var event = new CustomEvent('showGameAgain', { detail: data })
  //We tell the level to reload here
  window.document.dispatchEvent(event);
}); 

$("#showLastForm").click(function(){
  var data = { foo: 'showing second form' }
  var event = new CustomEvent('showLastForm', { detail: data })
  window.document.dispatchEvent(event);
}); 
