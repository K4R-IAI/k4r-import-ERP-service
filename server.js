const express 		  = require('express');
const bodyParser 	  = require('body-parser');
const fs 		        = require('fs');
const fileupload 	  = require('express-fileupload') ;
const swaggerJsDoc 	= require('swagger-jsdoc');
const swaggerUi 	  = require('swagger-ui-express');
var libxslt 		    = require('libxslt');
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
app.post('/xml', function (req, res, body) {

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



/**
 * @swagger
 * /xmlIDOC:
 *  post:
 *    description: Upload new xml file 
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.post('/xmlIDOC', (req, res) => 
{

  var JsonBackup;
  fext =0;
  var xmlIDOC = "idocdata" + fext+".xml";
  while(fs.existsSync('./'+xmlIDOC))
  {
    fext= fext + 1;
    xmlIDOC = "idocdata" + fext+".xml";
  }

  const xmll = req.body.xmlIDOC;
  xmlIDOC = "idocdata" + fext+".xml";
  jsondoc = "idocdata" + fext+".json";  
  txtdoc =    "idocdata" + fext+".txt";                   
  fs.writeFileSync(xmlIDOC, xmll); 


  var xmlString  = fs.readFileSync('./'+'WBBDLD_00016300.xml.xml',    'utf8');
  var xsltString = fs.readFileSync('./'+'xml_to_json_SandboxData.txt', 'utf8');
  libxslt.parse(xsltString, function(err, stylesheet){

  var params = {
    MyParam: 'my value'
  };

  stylesheet.apply(xmll, params, function(err, ProductsListJSON )
  {

   // To send json data back to the client
   const jsondata = JSON.parse(ProductsListJSON);
   res.send(jsondata);


   // To write to the file only .. do not use this variable in manipulation
   const data = JSON.stringify(jsondata);
   fs.writeFileSync(jsondoc,data );

    var productList = jsondata.products;


    for(var i = 0; i < productList.length; i++)
    {
      var product = productList[i];
      console.log(product.gtin);
    }


   //for (product in productList) 
   //{
    //console.log(product.gtin);
  //};








   
  });  
  });
  
    
  /*
    {
      "gtin": "4010355278234",
      "length": "28",
      "depth": "40",
      "height": "115",
      "name": "100001493",
      "LAYGR": "YLB002",
      "SORF1": "0000001107",
      "LAYVR": "YLB1LAYOUT",
      "MELAY": "PCE",
      "SHELF": "0000000003",
      "FACIN": "1.000",
      "LMVER": "0000",
      "FRONT": " 6.000",
      "VERAB": "20200324",
      "VERBI": "99991231",
      "MAXB": " 10.000",
      "PRABE": " 8.000"
    },


  var tables = [
      { "art":"A","count":"0","name":"name1","ean":"802.0079.127","marker":"null","stammkost":"A","tablename":"IWEO_IWBB_01062015" },
      { "art":"A","count":"0","name":"2","ean":"657.7406.559","marker":"null","stammkost":"A","tablename":"IWEO_IWBB_02062015" }
  ];

  */


  //JsonBackup.forEach(function(traverse) {
  //    var jsonObj = traverse;
   //   console.log(traverse);
  //});









});





app.listen(port);
console.log(`Running on http://${host}:${port}`);































