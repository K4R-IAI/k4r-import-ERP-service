const express = require('express')
const fs =  require('fs');
const app = express();
var fileupload = require('express-fileupload') ;

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const port = 3000;
const host = '0.0.0.0';
app.use(fileupload());

//Extended:http://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition:
    {
        info:
        {
            title:'Simulation API',
            description:'planogram simulation according to shelves data given',
            contact:
            {
                name : "Dr. Gautam Dange"
            },
            Servers:["http://localhost:3000"]
        }
    },
    //['.routes/*.js']
    apis:["app.js"]
}


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerDocs));



// Routes
/**
 * @swagger
 * /customers:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/customers", (req, res) => {
    res.status(200).send("Customer results");
  });

app.get('/runJava', (req, res) => 
{
    let jarFile     = './simulator.jar'
    let runCommand  = '/usr/bin/java -jar ' + jarFile 
    var exec = require('child_process').exec
    child = exec(runCommand, function (error, stdout, stderr) 
    {
        if(error !== null) 
        {
            console.log('exec error: ' + error);
        } 
        else 
        {
            console.log('stdout: ' + stdout);
        }
    })
    createfile();
    res.send("jar java executed !")
});

/**
 * @swagger
 * /setshelves:
 *  post:
 *    description: set up new shelves environment
 *    responses:
 *      '200':
 *        description: Shelf specifications inserted successfully
 */
app.post("/setshelves",function(req,res,next)
{
    writefile(req,res);
    runjar(req,res);
})


/**
 * @swagger
 * /getproducts:
 *  get:
 *    description: Use to request all products
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/getproducts",function(req,res,next)
{
   sendfile(req,res);
})
  
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
 * /xmlIDOC:
 *  get:
 *    description: Upload new xml file 
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.post('/xmlIDOC', (req, res) => 
{

  fext =0;
  var xmlIDOC = "idocdata" + fext+".xml";
  while(fs.existsSync('./'+xmlIDOC))
  {
    fext= fext + 1;
    xmlIDOC = "idocdata" + fext+".xml";
  }

  const xmll = req.body.xmlIDOC;
  xmlIDOC = "idocdata" + fext+".xml";
                                             
  fs.writeFileSync(xmlIDOC, xmll);

  res.send('New xml IDOC content inserted to the platform k4r');
});



var writefile = function(req,res)
{

   const file = req.files.shelvesMapping;
   file.mv("./files/json/"+file.name,function(err,result){if(err) throw err;})
}

var runjar= function(req,res)
{
    let jarFile     = './simulator.jar'
    let runCommand  = '/usr/bin/java -jar ' + jarFile 
    var exec = require('child_process').exec
    child = exec(runCommand, function (error, stdout, stderr) 
    {
        if(error !== null) 
        {
            console.log('exec error: ' + error);
        } 
        else 
        {
            console.log('stdout: ' + stdout);
        }
    })
    res.send("Shelves configured in the Simulator, so, product simulation can be requested !")
}

var sendfile= function(req,res)
{
    let filee = fs.readFileSync('./files/json/products.json');   
    let jsonfile = JSON.parse(filee);
    res.send(jsonfile)
}




app.listen(port);
console.log(`Running on http://${host}:${port}`);

