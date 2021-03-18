docker build -f Dockerfile -t importservice .
docker run -p 3456:3456 importservice .

