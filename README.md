# k4r-import-ERP-service


========== HOW TO USE ============================================================

1. Git Clone 

2. cd k4r-import-ERP-service/

3. sh run.sh

  *** in case your are running it second or later time .. 
  *** There might be an ERROR: ERRO[0000] error waiting for container: context canceled 
  *** To resolve it [need to stop previous docker container]
  *** 1. docker ps
  *** 2. docker stop [CONTAINER ID]


[open another terminal with same folder path]

4. sh curl.sh

====================================================================================


RESULT EXPECTED :
As an response you will get xml contents [IDOC XML SHELF 19]
[Then import service is working perfectly on your system]

====================================================================================


POSTing REQUSET via code :
Check the contents of curl.sh file
It has 3 importannt sections of request:
1. --location --request POST 'http://localhost:3456/xmlIDOC'
2. --header 'Content-Type: application/xml' \
3. --data-raw 'XML FILE CONTENTS'

===================================================================================

### MORE DETAILS :

RESTful Service imports ERP data in XML IDOC form and 
converts to JSON and Sends to Digital Twin

Build the docker image for container and Run the container:
docker build -f Dockerfile -t nodecontainer .
docker run -p 3456:3456 nodecontainer .

[Note: As you might have observed, I have changed port to 3456]



======================TO Check last sent xml string================================


GET
http://HOSTADDRESS:PORT/getLastXMLEntry

[OR]

CURL : 
curl --location --request GET 'http://localhost:3456/getLastXMLEntry'

[OR]
sh getLastXml.sh


======================================================================================


