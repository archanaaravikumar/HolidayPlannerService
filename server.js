var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');
  
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://heroku_3tlgh59r:66eba40kn3cvdmomgbh7e30u7m@ds139929.mlab.com:39929/heroku_3tlgh59r'); 

function ignoreFavicon(req, res, next) {
  if (req.originalUrl === '/favicon.ico') {
    res.status(204).json({nope: true});
  } else {
    next();
  }
}
const verifyAlexaSkillRequest = require('./api/controllers/alexa/middlewares/validAlexaSkillRequestMiddleware');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(ignoreFavicon);
app.use(verifyAlexaSkillRequest())

var flightRoutes = require('./api/routes/flightAvailabilityServiceRoutes');
var alexaRoutes = require('./api/routes/alexaRoutes');

flightRoutes(app);
alexaRoutes(app);

app.listen(port);

console.log('RESTful API server started on: ' + port);
