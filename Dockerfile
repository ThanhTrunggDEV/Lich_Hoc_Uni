FROM nginx:alpine


COPY pages/mainPage.html /usr/share/nginx/html/index.html
COPY pages/lichhoc.html /usr/share/nginx/html/lichhoc.html
COPY pages/login.html /usr/share/nginx/html/login.html
COPY pages/about.html /usr/share/nginx/html/about.html
COPY pages/contact.html /usr/share/nginx/html/contact.html
COPY pages/privacy.html /usr/share/nginx/html/privacy.html
COPY pages/terms.html /usr/share/nginx/html/terms.html

COPY sitemap.xml /usr/share/nginx/html/sitemap.xml

COPY css/mainPageStyle.css /usr/share/nginx/html/css/mainPageStyle.css
COPY css/lichhoc.css /usr/share/nginx/html/css/lichhoc.css
COPY css/login.css /usr/share/nginx/html/css/login.css
COPY css/shootingstars.css /usr/share/nginx/html/css/shootingstars.css

COPY scripts/main.js /usr/share/nginx/html/scripts/main.js
COPY scripts/login.js /usr/share/nginx/html/scripts/login.js
COPY scripts/mainPage.js /usr/share/nginx/html/scripts/mainPage.js

COPY scripts/api/exam.js /usr/share/nginx/html/scripts/api/exam.js
COPY scripts/api/quote.js /usr/share/nginx/html/scripts/api/quote.js
COPY scripts/api/timetable.js /usr/share/nginx/html/scripts/api/timetable.js
COPY scripts/api/online.js /usr/share/nginx/html/scripts/api/online.js

COPY scripts/core/auth.js /usr/share/nginx/html/scripts/core/auth.js

COPY scripts/ui/darkmode.js /usr/share/nginx/html/scripts/ui/darkmode.js
COPY scripts/ui/donateModal.js /usr/share/nginx/html/scripts/ui/donateModal.js
COPY scripts/ui/error.js /usr/share/nginx/html/scripts/ui/error.js
COPY scripts/ui/greeting.js /usr/share/nginx/html/scripts/ui/greeting.js
COPY scripts/ui/logout.js /usr/share/nginx/html/scripts/ui/logout.js
COPY scripts/ui/refresh.js /usr/share/nginx/html/scripts/ui/refresh.js
COPY scripts/ui/tabs.js /usr/share/nginx/html/scripts/ui/tabs.js
COPY scripts/ui/config.js /usr/share/nginx/html/scripts/ui/config.js

COPY scripts/utils/card.js /usr/share/nginx/html/scripts/utils/card.js
COPY scripts/utils/date.js /usr/share/nginx/html/scripts/utils/date.js
COPY scripts/utils/period.js /usr/share/nginx/html/scripts/utils/period.js
COPY scripts/utils/transform.js /usr/share/nginx/html/scripts/utils/transform.js


COPY robots.txt /usr/share/nginx/html/robots.txt

COPY resources/favicon.ico /usr/share/nginx/html/favicon.ico
COPY sw.js                 /usr/share/nginx/html/sw.js
COPY icons/                /usr/share/nginx/html/icons/
COPY manifest.json         /usr/share/nginx/html/manifest.json

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
