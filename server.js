var path = require('path');
var express = require('express');
var cors = require('cors');

var app = express();
app.use(cors());
var staticPath = path.join(__dirname, '/public');
app.use(express.static(staticPath));

app.listen(3000, function() {
  console.log('listening');
});