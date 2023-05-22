// config secure server
require('dotenv').config();
// create server 
const fileUpload = require('express-fileupload');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./app/router/index');

const PORT = process.env.PORT || 8080;

const app = express();

/** ********* */
/*  SWAGGER */
/** ******** */
const expressJSDocSwagger = require('express-jsdoc-swagger');

const options = {
  info: {
    version: '1.0.0',
    title: 'API Documentation',
    license: {
      name: 'MIT',
    },
  },
  security: {
    BasicAuth: {
      type: 'http',
      scheme: 'basic',
    },
    BearerAuth: {
      type: 'http',
      scheme: 'bearer',
    },
  },
  swaggerUIPath: '/docs', // where documentation is it 
  baseDir: __dirname,
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: './app/router/*.js',
  exposeSwaggerUI: true, // Expose OpenAPI UI
};
expressJSDocSwagger(app)(options);

app.use(fileUpload());

// For using a static file 
app.use('/', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));

// for use a method : Post and use body in form
app.use(express.urlencoded({ extended: true }));
app.use(cors('*'));
app.use(bodyParser.json());

app.use(router);

app.listen(PORT, () => {
  console.log('Server started on port', PORT);
});
