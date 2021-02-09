const express 		  = require('express');
const bodyParser 	  = require('body-parser');
const fs 		        = require('fs');
const fileupload 	  = require('express-fileupload') ;
const swaggerJsDoc 	= require('swagger-jsdoc');
const swaggerUi 	  = require('swagger-ui-express');
var DOMParser       = new (require('xmldom')).DOMParser({ normalizeTags: { default: false } });
require("body-parser-xml")(bodyParser);
var xml2js          = require('xml2js');
var builder         = new xml2js.Builder({ standalone: { default: false } });
var app             = express();
//Options of body-parser-xml module

app.use(bodyParser.xml({limit: '50mb'},{
    xmlParseOptions: {
        normalize: false,     // Trim whitespace inside text nodes
        normalizeTags: false, // Transform tags to lowercase
        explicitArray: false // Only put nodes in array if >1
    }
}));


const port = 3000;
const host = '0.0.0.0';

app.use(fileupload());




//Extended:http://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition:
    {
        info:
        {
            title:'ImportService',
            description:'EPR import Service with XSL-Translation',
            contact:
            {
                name : "Dr. Gautam Dange"
            },
            Servers:["http://localhost:3000"]
        }
    },
    //['.routes/*.js']
    apis:["server.js"]
}


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerDocs));


/**
 * @swagger
 * /getLastXMLEntry:
 *  get:
 *    description: Get last uploaded xml file 
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get('/getLastXMLEntry', (req, res) => 
{
  fext =0;
  var xmlIDOC = "idocdata" + fext+".xml";
  while(fs.existsSync('./'+xmlIDOC))
  {
    fext= fext + 1;
    xmlIDOC = "idocdata" + fext+".xml";
  }
  ext= fext - 1;
  
  var xmlIDOC = "idocdata" + ext+".xml"
  if(fext==0)
  {
	res.send("No has been uploaded yet");
  }
  var data = fs.readFileSync('./'+xmlIDOC, 'utf8');
  res.send(data);
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
app.post('/xml', function (req, res, body) 
{

  fext =0;
  var xmlIDOC = "idocdata" + fext+".xml";
  while(fs.existsSync('./'+xmlIDOC))
  {
    fext= fext + 1;
    xmlIDOC = "idocdata" + fext+".xml";
  }
  //Parsing Request.Body
  var document = DOMParser.parseFromString(
      builder.buildObject(req.body).toString()
  );
  xmlIDOC = "idocdata" + fext+".xml";
  var xmll =   builder.buildObject(req.body).toString()    ;
  fs.writeFileSync(xmlIDOC, xmll); 
  res.send(xmll.toString());
});
  

app.listen(port);
console.log(`Running on http://${host}:${port}`);































