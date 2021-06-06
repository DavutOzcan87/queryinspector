from nginx
COPY dist/queryinspector/ /usr/share/nginx/html/
copy default.conf /etc/nginx/conf.d/default.conf