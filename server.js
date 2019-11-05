const express = require('express');
const request = require('request');
const app = express();
const bodyParser = require('body-parser');
const api = require('./private/apiKeys');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req,res) => {
    res.render('index', {weather: null, error: null});
});

app.post('/', (req, res) => {
  let city = req.body.city;
  let url = `api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api.weatherApi}`;
  
  request (url, (err, response, body) => {
    if (err) {
        res.render('index', {weather: null, error: 'Error, please try again'});
    }
    else {
        let weather = JSON.parse(body);
        if (weather.main == undefined) {
            res.render('index', {weather: null, error:'Error, Please try again'});
        }
        else {
            res.render('index', {weather: weather.main.temp, error: null});
        }
    }
  });
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});