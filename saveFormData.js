var form1Data;
var form2Data;
var form3Data;
var form4Data;

window.document.addEventListener('getPlayerIdentifierFromWebsite', returnPlayerIdentifierToIframe, false);

function returnPlayerIdentifierToIframe(e){
    var event = new CustomEvent('returnPlayerIdentifierToIframe', { detail: form1Data.timeOfForm1Submit.toString()  });
    document.getElementById('unityIframe').contentWindow.document.dispatchEvent(event);
}

function handleForm1Submit(form) {
    form.preventDefault();
  
    const data = new FormData(form.target);
    const formJSON = Object.fromEntries(data.entries());
    // for multi-selects, we need special handling
    formJSON.snacks = data.getAll('snacks');
    $.getJSON('https://api.db-ip.com/v2/free/self', function(data) {
        formJSON.locationData = data;
    });
    var currentTime = new Date();
    formJSON.timeOfForm1Submit = currentTime;
    form1Data = formJSON;
    console.log(JSON.stringify(formJSON, null, 2));


    var eventData = { foo: 'showing game' }
    var event = new CustomEvent('showGame', { detail: eventData });
    window.document.dispatchEvent(event);
    //we dont send data here, since we still dont have the location data at this point
}

function handleForm2Submit(form) {
    form.preventDefault();
  
    const data = new FormData(form.target);
    const formJSON = Object.fromEntries(data.entries());
    // for multi-selects, we need special handling
    formJSON.snacks = data.getAll('snacks');
    form2Data = formJSON;
    console.log(JSON.stringify(formJSON, null, 2));

    var eventData = { foo: 'showing second form' }
    var event = new CustomEvent('showGameAgain', { detail: eventData })
    //We tell the level to reload here
    window.document.dispatchEvent(event);
    sendDataToDatabaseWithoutFeedback();
}

function handleForm3Submit(form) {
    form.preventDefault();
  
    const data = new FormData(form.target);
    const formJSON = Object.fromEntries(data.entries());
    // for multi-selects, we need special handling
    formJSON.snacks = data.getAll('snacks');
    form3Data = formJSON;
    console.log(JSON.stringify(formJSON, null, 2));
    //sendDataToDatabase();
    sendDataToDatabaseWithoutFeedback();
    $(".third-form").hide();  
    $(".fourth-form").show();  
}


function handleForm4Submit(form) {
    form.preventDefault();

    const data = new FormData(form.target);
    const formJSON = Object.fromEntries(data.entries());
    // for multi-selects, we need special handling
    formJSON.snacks = data.getAll('snacks');
    form4Data = formJSON;
    console.log(JSON.stringify(formJSON, null, 2));
    sendDataToDatabase();
}

function sendDataToDatabaseWithoutFeedback(){
    var mergedObject = {
        form1Data,
        form2Data,
        form3Data,
        form4Data,
        game1Data,
        game2Data
      };
    var message = JSON.stringify(mergedObject, null, 2);
    console.log("Sending data: " + message);

    const url = "https://coopgame.herokuapp.com/app.js";
    const data = {say: "sent", to: message}
    $.ajaxSetup({
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    $.post(url,data, function(data, status){
        console.log("Upload status: " + status + " Data sent: " + data )
    }); 
}

function sendDataToDatabase(){
    var mergedObject = {
        form1Data,
        form2Data,
        form3Data,
        form4Data,
        game1Data,
        game2Data
      };
    var message = JSON.stringify(mergedObject, null, 2);
    console.log("Sending data: " + message);

    const url = "https://coopgame.herokuapp.com/app.js";
    const data = {say: "sent", to: message}
    $.ajaxSetup({
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    $.post(url,data, function(data, status){
        console.log("Upload status: " + status + " Data sent: " + data )
        if(status == "success")
        {
            $(".fourth-form").hide(); 
            $("#thanks_for_participating").show();  
            $("#error_uploading").hide();
            removeExitWarning();
        }
        else {
            $("#error_uploading").show();  
        }
    }); 
}


const form1 = document.querySelector('.first-form');
form1.addEventListener('submit', handleForm1Submit);

const form2 = document.querySelector('.second-form');
form2.addEventListener('submit', handleForm2Submit);

const form3 = document.querySelector('.third-form');
form3.addEventListener('submit', handleForm3Submit);

const form4 = document.querySelector('.fourth-form');
form4.addEventListener('submit', handleForm4Submit);

function printCollectedData()
{
    var mergedObject = {
        form1Data,
        form2Data,
        form3Data,
        form4Data,
        game1Data,
        game2Data
      };
       
    console.log(JSON.stringify(mergedObject, null, 2));
}

