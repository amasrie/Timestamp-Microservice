var express = require('express');
var app = express();
var moment = require('moment');

app.use(express.static('public'));

app.use(function(req, res, next){
  console.log(req.url);
  if(req.url == '/'){
    next();
  }else{
    console.log((req.url).substr(1));
    var date;
    
    date = Number((req.url).substr(1)) ? moment.unix((req.url).substr(1)) : moment((req.url).substr(1).replace(/%20/g, " "));
    res.send({"unix": Number(date.format('x')), "natural": date.isValid() ? date.format("MMMM DD, YYYY") : null });
  }  
});

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
