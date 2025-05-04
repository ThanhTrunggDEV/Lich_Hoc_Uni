FROM nginx:alpine

COPY mainPage.html /usr/share/nginx/html/index.html
COPY mainPageStyle.css /usr/share/nginx/html/mainPageStyle.css
COPY superstyle.css /usr/share/nginx/html/superstyle.css
COPY superstyle.css.map /usr/share/nginx/html/superstyle.css.map
COPY script.js /usr/share/nginx/html/script.js
COPY superstyle.scss /usr/share/nginx/html/superstyle.scss
COPY lichhoc.html /usr/share/nginx/html/lichhoc.html
COPY login.html /usr/share/nginx/html/login.html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
