FROM nginx:alpine


COPY pages/mainPage.html /usr/share/nginx/html/index.html
COPY pages/lichhoc.html /usr/share/nginx/html/lichhoc.html
COPY pages/login.html /usr/share/nginx/html/login.html

COPY css/mainPageStyle.css /usr/share/nginx/html/css/mainPageStyle.css
COPY css/lichhoc.css /usr/share/nginx/html/css/lichhoc.css
COPY css/login.css /usr/share/nginx/html/css/login.css
COPY css/shootingstars.css /usr/share/nginx/html/css/shootingstars.css

COPY scripts/lichhoc.js /usr/share/nginx/html/scripts/lichhoc.js
COPY scripts/login.js /usr/share/nginx/html/scripts/login.js

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
