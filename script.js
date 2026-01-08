document.addEventListener('DOMContentLoaded', () => {
    // Header background change on scroll
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Audio Player Logic
    const audioPlayer = document.getElementById('audio-player');
    const playButtons = document.querySelectorAll('.play-btn');
    let currentPlayingBtn = null;

    playButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const audioSrc = btn.getAttribute('data-src');
            const demoItem = btn.closest('.demo-item');

            if (currentPlayingBtn === btn) {
                // Toggle pause if clicking the same button
                if (audioPlayer.paused) {
                    audioPlayer.play();
                    btn.innerHTML = '<i class="fas fa-pause"></i>';
                    demoItem.classList.add('playing');
                } else {
                    audioPlayer.pause();
                    btn.innerHTML = '<i class="fas fa-play"></i>';
                    demoItem.classList.remove('playing');
                }
            } else {
                // Play new track
                if (currentPlayingBtn) {
                    currentPlayingBtn.innerHTML = '<i class="fas fa-play"></i>';
                    currentPlayingBtn.closest('.demo-item').classList.remove('playing');
                }

                audioPlayer.src = audioSrc;
                audioPlayer.play();
                btn.innerHTML = '<i class="fas fa-pause"></i>';
                demoItem.classList.add('playing');
                currentPlayingBtn = btn;
            }
        });
    });

    // Reset when audio ends
    audioPlayer.addEventListener('ended', () => {
        if (currentPlayingBtn) {
            currentPlayingBtn.innerHTML = '<i class="fas fa-play"></i>';
            currentPlayingBtn.closest('.demo-item').classList.remove('playing');
            currentPlayingBtn = null;
        }
    });

    // Mobile Menu Toggle logic
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
            }
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Production Form Submission to WhatsApp
    const productionForm = document.getElementById('form-produccion');
    if (productionForm) {
        productionForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value;
            const genero = document.getElementById('genero').value;
            const letra = document.getElementById('letra').value;
            const demo = document.getElementById('demo-link').value;

            const message = `Hola Facundo! 🎹%0A%0AHe completado el formulario de producción en la web de *Kundo Record*:%0A%0A👤 *Artista:* ${nombre}%0A🎵 *Género:* ${genero}%0A📝 *Letra/Idea:* ${letra}%0A🔗 *Demo Link:* ${demo}%0A%0A🚀 ¡Espero tu respuesta para empezar a trabajar!`;

            const whatsappUrl = `https://wa.me/5491159003781?text=${message}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    // Protection Form Submission to WhatsApp
    const protectionForm = document.getElementById('form-proteccion');
    if (protectionForm) {
        protectionForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('prot-nombre').value;
            const tipo = document.getElementById('prot-tipo').value;
            const mensaje = document.getElementById('prot-mensaje').value;

            const message = `Hola Facundo! 🛡️%0A%0AHe completado el formulario de *Protección de Obras* en la web:%0A%0A👤 *Nombre:* ${nombre}%0A📁 *Tipo de registro:* ${tipo}%0A💬 *Consulta:* ${mensaje}%0A%0A⚖️ ¡Necesito asesoría para proteger mi música!`;

            const whatsappUrl = `https://wa.me/5491159003781?text=${message}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    // Smooth scroll for "Elegir Plan" buttons
    document.querySelectorAll('.select-plan').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

