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


        let deferredPrompt;
        const installBtn = document.getElementById('installAppBtn');
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            installBtn && (installBtn.style.display = 'inline-flex');
        });
        installBtn && installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') {
                    installBtn.style.display = 'none';
                }
                deferredPrompt = null;
            }
        });

        function isIos() {
            return /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
        }
        function isInStandaloneMode() {
            return ('standalone' in window.navigator) && window.navigator.standalone;
        }
        if (installBtn && isIos() && !isInStandaloneMode()) {
            installBtn.style.display = 'inline-flex';
            installBtn.onclick = function() {
                alert('Để thêm ứng dụng vào màn hình chính:\n1. Nhấn nút Chia sẻ (Share) trên Safari.\n2. Chọn "Thêm vào Màn hình chính" (Add to Home Screen).');
            };
        }