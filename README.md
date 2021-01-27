# k4r-import-ERP-service
RESTful Service imports ERP data in XML IDOC form and 
converts to JSON and Sends to Digital Twin

Build the docker image for container and Run the container:
docker build -f Dockerfile -t nodecontainer .
docker run -p 3000:3000 nodecontainer .

POST
http://HOSTADDRESS:PORT/xmlIDOC
body:
{"xmlIDOC":"xml file contents"}

GET
http://HOSTADDRESS:PORT/getLastXMLEntry

