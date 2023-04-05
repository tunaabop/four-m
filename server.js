require('dotenv').config();
const exphbs = require('express-handlebars');
const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const sequelize = require('./config/connection');
const router = require('./controllers');
const helpers = require('./util/helpers');
const sessionMiddleware = require('./config/session');

const PORT = process.env.PORT || 3001;
const app = express();

// setup app middleware
app.use(sessionMiddleware);
  // use the express-fileupload middleware for post img upload
  app.use(fileUpload({
    limits: {
        fileSize: 10000000, // limit img size to around 10MB
    },
    abortOnLimit: true,
}));
app.use(express.static(path.join(__dirname, 'public')));
// TODO: implement to fetch image - not working rn
// app.use('/upload', express.static('upload'));
app.engine('handlebars', exphbs({ helpers }));
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect routes
app.use(router);

// connect db and listen
sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, (err) => {
      if (err) {
        console.error(err);
        return process.exit(1);
      }
      console.log(`Four'm App listening on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
