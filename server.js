const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const api = require('./private/apiKeys');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.post('/', (req, res) => {
  res.render('index');
  console.log(req.body.city);
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});