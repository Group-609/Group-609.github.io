var form1Data;
var form2Data;
var form3Data;

function handleForm1Submit(form) {
    form.preventDefault();
  
    const data = new FormData(form.target);
    const formJSON = Object.fromEntries(data.entries());
    // for multi-selects, we need special handling
    formJSON.snacks = data.getAll('snacks');
    $.getJSON('https://api.db-ip.com/v2/free/self', function(data) {
        formJSON.locationData = data;
    });
    form1Data = formJSON;
    console.log(JSON.stringify(formJSON, null, 2));


    var eventData = { foo: 'showing game' }
    var event = new CustomEvent('showGame', { detail: eventData });
    window.document.dispatchEvent(event);
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
}

function handleForm3Submit(form) {
    form.preventDefault();
  
    const data = new FormData(form.target);
    const formJSON = Object.fromEntries(data.entries());
    // for multi-selects, we need special handling
    formJSON.snacks = data.getAll('snacks');
    form3Data = formJSON;
    console.log(JSON.stringify(formJSON, null, 2));

}


const form1 = document.querySelector('.first-form');
form1.addEventListener('submit', handleForm1Submit);

const form2 = document.querySelector('.second-form');
form2.addEventListener('submit', handleForm2Submit);

const form3 = document.querySelector('.third-form');
form3.addEventListener('submit', handleForm3Submit);

function printCollectedData()
{
    var mergedObject = {
        form1Data,
        form2Data,
        form3Data
      };
       
    console.log(JSON.stringify(mergedObject, null, 2));
}