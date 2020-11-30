const CONFIG = require('./conf.json');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors(CONFIG.corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./app/models');
const Role = db.role;

db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true }).then(() => {
  db.sequelize.sync(CONFIG.sequelize).then(() => { // this row for development
    initial();
    db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { raw: true });
  });
});


require('./app/routes/post.routes')(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// Set route, listen for requests
// const PORT = process.env.PORT || CONFIG.port || 8081;
// app.listen(PORT, () => {
//   console.log(`The server is running on port ${PORT}.`);
// })

function initial() { // this function is for development
  Role.create({
    id: 1,
    name: 'user'
  })
  .catch(err => {
    console.log('The role had already exist. key duplicated.')
  });

  Role.create({
    id: 2,
    name: 'moderator'
  })
  .catch(err => {
    console.log('The role had already exist. key duplicated.')
  });

  Role.create({
    id: 3,
    name: 'admin'
  })
  .catch(err => {
    console.log('The role had already exist. key duplicated.')
  });
}

module.exports = app;