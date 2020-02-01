const baseUrl = 'https://api.aylien.com/api/v1'
const application_id = 'process.env.API_ID'
const application_key = 'process.env.API_KEY'

var AYLIENTextAPI = require('aylien_textapi');
var textapi = new AYLIENTextAPI({
  application_id: "process.env.API_ID",
  application_key: "process.env.API_KEY"
});

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    // Client.checkForName(formText)

    // Sentiment Analysis Call
    textapi.sentiment({formText}, 
        function(error, response) {
        if (error === null) {
        console.log(response);
        }
    });

    console.log("::: Form Submitted :::")
    fetch('https://api.aylien.com/api/v1')
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = res.message
    })
}

export { handleSubmit }
