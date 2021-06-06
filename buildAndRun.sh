docker rmi -f $(docker images | grep queryinspector | awk '{split($0,a); print a[3];}';)
rm -rf dist
npm run-script build
docker build . --no-cache -t queryinspector

docker tag queryinspector registry.digitalocean.com/dwt-development/queryinspector
docker push registry.digitalocean.com/dwt-development/queryinspector

docker run -it -p 88:80 queryinspector