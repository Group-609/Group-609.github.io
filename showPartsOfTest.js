window.document.addEventListener('showGame', handleEventShowGame, false);
window.document.addEventListener('showSecondForm', handleEventShowSecondForm, false);
window.document.addEventListener('showGameAgain', handleEventShowGameAgain, false);
window.document.addEventListener('showLastForm', handleEventShowLastForm, false);


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
  dispatchEvent(event);
}); 

$("#ShowSecondForm").click(function(){
  var data = { foo: 'showing second form' }
  var event = new CustomEvent('showSecondForm', { detail: data })
  dispatchEvent(event);
}); 

$("#showGameAgain").click(function(){
  var data = { foo: 'showing second form' }
  var event = new CustomEvent('showGameAgain', { detail: data })
  dispatchEvent(event);
}); 

$("#showLastForm").click(function(){
  var data = { foo: 'showing second form' }
  var event = new CustomEvent('showLastForm', { detail: data })
  dispatchEvent(event);
}); 