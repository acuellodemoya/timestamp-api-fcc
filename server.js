
var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Exercise Code

app.get('/api', (req, res) =>{
  let date = Date.now();
  date = new Date(date)
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
  return;
});


app.get("/api/:date", (req, res) => {
  let date;
  date = new Date(req.params.date);
  if(date.toUTCString() === 'Invalid Date'){
    date = new Date(+req.params.date)
    if(date.toUTCString() === 'Invalid Date'){
      res.json({
        error: 'Invalid Date'
      });
      return;
    }
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
    return;
  }
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
  return;
});

// End Exercise Code

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
