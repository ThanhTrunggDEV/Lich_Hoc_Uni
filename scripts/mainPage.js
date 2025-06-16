function animateOnScroll() {
            const elements = document.querySelectorAll('.animate-on-scroll');
            const triggerBottom = window.innerHeight * 0.9;
            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < triggerBottom) {
                    el.classList.add('animated');
                }
            });
        }
        window.addEventListener('scroll', animateOnScroll);
        window.addEventListener('load', animateOnScroll);

        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        const themeToggleBtn = document.getElementById('themeToggleBtn');
        const body = document.body;
        const iconSun = themeToggleBtn.querySelector('.icon-sun');
        const iconMoon = themeToggleBtn.querySelector('.icon-moon');
        function setTheme(isLight) {
            if (isLight) {
                body.classList.add('light-mode');
                localStorage.setItem('theme', 'light');
            } else {
                body.classList.remove('light-mode');
                localStorage.setItem('theme', 'dark');
            }
        }

        (function() {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                setTheme(false);
            } else {
                setTheme(true);
            }
        })();
        themeToggleBtn.addEventListener('click', function() {
            const isLight = !body.classList.contains('light-mode');
            setTheme(isLight);
        });