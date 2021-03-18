const express = require('express');
var request = require('request');
const bodyParser = require('body-parser');
const fs = require('fs');
const fileupload = require('express-fileupload');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
var DOMParser = new (require('xmldom')).DOMParser({ normalizeTags: { default: false } });
var libxslt = require('libxslt');
require("body-parser-xml")(bodyParser);
var xml2js = require('xml2js');
var builder = new xml2js.Builder({ standalone: { default: false } });
var app = express();
//Options of body-parser-xml module

app.use(bodyParser.xml({ limit: '50mb' }, {
  xmlParseOptions: {
    normalize: false,     // Trim whitespace inside text nodes
    normalizeTags: false, // Transform tags to lowercase
    explicitArray: false // Only put nodes in array if >1
  }
}));

const port = 3456;
const host = '0.0.0.0';
app.use(fileupload());

//Extended:http://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition:
  {
    info:
    {
      title: 'ImportService',
      description: 'EPR import Service with XSL-Translation',
      contact:
      {
        name: "Dr. Gautam Dange"
      },
      Servers: ["http://localhost:3456"]
    }
  },
  //['.routes/*.js']
  apis: ["server.js"]
}


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


/**
 * @swagger
 * /getLastXMLEntry:
 *  get:
 *    description: Get last uploaded xml file 
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get('/getLastXMLEntry', (req, res) => {
  fext = 0;
  var xmlIDOC = "idocdata" + fext + ".xml";
  while (fs.existsSync('./' + xmlIDOC)) {
    fext = fext + 1;
    xmlIDOC = "idocdata" + fext + ".xml";
  }
  ext = fext - 1;

  var xmlIDOC = "idocdata" + ext + ".xml"
  if (fext == 0) {
    res.send("No has been uploaded yet");
  }
  var data = fs.readFileSync('./' + xmlIDOC, 'utf8');
  res.send(data);
})


/**
 * @swagger
 * /xmlIDOC:
 *  post:
 *    description: Upload new xml file 
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.post('/xmlIDOC1', (req, res) => {

  fext = 0;
  var xmlIDOC = "idocdata" + fext + ".xml";
  while (fs.existsSync('./' + xmlIDOC)) {
    fext = fext + 1;
    xmlIDOC = "idocdata" + fext + ".xml";
  }
  //Parsing Request.Body
  var document = DOMParser.parseFromString(
    builder.buildObject(req.body).toString()
  );
  xmlIDOC = "idocdata" + fext + ".xml";
  var xmll = builder.buildObject(req.body).toString();
  fs.writeFileSync(xmlIDOC, xmll);
  jsondoc = "idocdata" + fext + ".json";

  var xmlString = fs.readFileSync('./' + xmlIDOC, 'utf8');
  var xsltString = fs.readFileSync('./xsl/' + 'xsl-1.txt', 'utf8');
  libxslt.parse(xsltString, function (err, stylesheet) {

    var params = {
      MyParam: 'my value'
    };

    stylesheet.apply(xmll, params, function (err, ProductsListJSON) {

      // To send json data back to the client
      const jsondata = JSON.parse(ProductsListJSON);
      res.send(jsondata);


      // To write to the file only .. do not use this variable in manipulation
      const data = JSON.stringify(jsondata);
      fs.writeFileSync(jsondoc, data);

      var productList = jsondata.products;


      for (var i = 0; i < productList.length; i++) {
        var product = productList[i];
        console.log(product.gtin);
      }

      let dataString = fs.readFileSync(jsondoc);
      var headers = {
        'accept': '*/*',
        'Content-Type': 'application/json'
      };

      //var dataString = '{ "products": [{ "depth": 111, "description": "PRODUCTGTIN00001", "gtin": "GTINN1", "height": 222, "id": "100", "length": 333, "name": "PRODUCTGTIN00001", "weight": 20},{ "depth": 111, "description": "PRODUCTGTIN00001", "gtin": "GTINN2", "height": 222, "id": "101", "length": 333, "name": "PRODUCTGTIN00001", "weight": 20}]}';

      var options = {
        url: 'http://localhost:8090/k4r-core/api/v0/products/list',
        method: 'POST',
        headers: headers,
        body: dataString
      };

      function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body);
        }
      }
      request(options, callback);
    });
  });
})


/**
 * @swagger
 * /xml:
 *  post:
 *    description: Upload new xml file 
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.post('/xmlIDOC', function (req, res, body) {

  fext = 0;
  var xmlIDOC = "idocdata" + fext + ".xml";
  while (fs.existsSync('./' + xmlIDOC)) {
    fext = fext + 1;
    xmlIDOC = "idocdata" + fext + ".xml";
  }
  //Parsing Request.Body
  var document = DOMParser.parseFromString(
    builder.buildObject(req.body).toString()
  );
  xmlIDOC = "idocdata" + fext + ".xml";
  var xmll = builder.buildObject(req.body).toString();
  fs.writeFileSync(xmlIDOC, xmll);
  res.send(xmll.toString());
});

/**
 * @swagger
 * /xml:
 *  post:
 *    description: Upload new xml file 
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.post('/xml', function (req, res, body) {

  fext = 0;
  var xmlIDOC = "idocdata" + fext + ".xml";
  while (fs.existsSync('./' + xmlIDOC)) {
    fext = fext + 1;
    xmlIDOC = "idocdata" + fext + ".xml";
  }
  //Parsing Request.Body
  var document = DOMParser.parseFromString(
    builder.buildObject(req.body).toString()
  );
  xmlIDOC = "idocdata" + fext + ".xml";
  var xmll = builder.buildObject(req.body).toString();
  fs.writeFileSync(xmlIDOC, xmll);
  res.send(xmll.toString());
});

app.listen(port);
console.log(`Running on http://${host}:${port}`);




















