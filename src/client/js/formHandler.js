const baseUrl = 'https://api.aylien.com/api/v1'
const application_id = 'process.env.API_ID'
const application_key = 'process.env.API_KEY'

var AYLIENTextAPI = require('aylien_textapi');
var textapi = new AYLIENTextAPI({
  application_id: "process.env.API_ID",
  application_key: "process.env.API_KEY"
});

// GET Request
const getData = async (baseUrl, application_id, application_key) => {
    try {
        const res = await fetch (baseUrl + application_id + application_key)
        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log('error', error);
    }
};

// POST Request 
const postData = async (url = '', data ={}) => {
    try {
        const response = await fetch (url, {
            method: 'CORS',
            credentials: 'same-origin',
            headers: {
                'X-AYLIEN-TextAPI-Application-Key': application_key,
                'X-AYLIEN-TextAPI-Application-ID': application_id
            },
            body: JSON.stringify(data)
        });
        return(response);
    } catch(error) {
        console.log('error', error);
    }
};

// Update UI
const updateUI = async() => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        const evaluation = document.getElementById('results').innerHTML = allData.polarity;
        console.log(allData);
    } catch(error) {
        console.log('error', error);
    }
};

// Handle Submit Function
document.getElementById('generate').addEventListener('click', handleSubmit);

function handleSubmit(event) {
    event.preventDefault()
    let formText = document.getElementById('name').value
    
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
