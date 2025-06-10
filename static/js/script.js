// En tu script.js original (página principal)
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        window.location.href = `${lang}.html`;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // subitutlos
    const subtitles = [
        { start: 0, end: 7, quechua: "Ñuka Chaska, kanpa pushak digita kanchi El Wayku Ayllupi", es: "Hola Soy Chaska, tu guía digital en la comunidad El Wayku!" },
        { start: 7, end: 20, quechua: "Kaypi kani, kanman willanampa, maykan kananmanta, ñuka llakta El Wayku Warmakunamanta.", es: "Estoy aqui para contarte sobre nuestros lugares mágicos, Bienvenido, viajero! Siente la energía de Lamas." },
        { start: 20, end: 31, quechua: "¡Allinmi, purik runa! Lamas kallpata muskay, chaymanta kaypi kananmanta mana kunkayuk kananpak.", es: "Y prepárate para una experiencia inolvidable" },
    ];
    const subtitleQuechua = document.getElementById('subtitle-quechua');
    const subtitleEs = document.getElementById('subtitle-es');
    const audiosub = document.getElementById('welcome-audio');

    audiosub.addEventListener('timeupdate', () => {
        const currentTime = audio.currentTime;
        const subtitle = subtitles.find(s => currentTime >= s.start && currentTime < s.end);
        if (subtitle) {
        subtitleQuechua.textContent = subtitle.quechua;
        subtitleEs.textContent = subtitle.es;
        } else {
            subtitleQuechua.textContent = '';
            subtitleEs.textContent = '';
        }
    });

    // ===== AUDIO DE BIENVENIDA ===== //
    const audio = document.getElementById('welcome-audio');
    const backgroundAudio = document.getElementById('background-music');
    const audioHint = document.getElementById('audio-hint');
    audio.volume = 0.5;
    backgroundAudio.volume = 0.1;
    audioHint.style.display = 'none';

    // Función para reproducir el audio (con reinicio automático)
    const playAudio = () => {
    // Audio de bienvenida
    audio.play()
        .then(() => {
            console.log("🔊 Audio de bienvenida reproducido");
            audioHint.style.display = 'none';

            // Reinicio automático solo para el de bienvenida
            audio.addEventListener('ended', () => {
                audio.currentTime = 0;
                audio.play().catch(e => console.log("Error al reiniciar bienvenida:", e));
            }, { once: true });

            // Reproducir música de fondo
            backgroundAudio.play().then(() => {
                console.log("🎵 Música de fondo activada");
            }).catch(() => {
                console.log("⚠️ Música de fondo bloqueada");
            });

        })
        .catch(e => {
            console.log("⚠️ Audio bloqueado. Esperando interacción...");
            audioHint.style.display = 'block';

            const enableAudio = () => {
                audio.play();
                backgroundAudio.play();

                audioHint.style.display = 'none';
                document.removeEventListener('click', enableAudio);
                document.removeEventListener('keydown', enableAudio);

                audio.addEventListener('ended', () => {
                    audio.currentTime = 0;
                    audio.play().catch(e => console.log("Error al reiniciar bienvenida:", e));
                }, { once: true });
            };

            document.addEventListener('click', enableAudio);
            document.addEventListener('keydown', enableAudio);
        });
    };

    // Reproducir al cargar y cuando la página gana foco
    playAudio();
    window.addEventListener('focus', playAudio);

    // ===== TEXTO ROTATIVO ===== //
    const welcomeText = document.getElementById('welcome-text');
    const messages = {
        quechua: "Allillanchu!",
        es: "¡Bienvenido!",
        en: "Welcome!"
    };

    let currentLang = 'quechua';
    welcomeText.textContent = messages[currentLang];
    welcomeText.classList.add('active');

    // Rotar mensajes cada 3 segundos
    setInterval(() => {
        welcomeText.classList.remove('active');
        setTimeout(() => {
            currentLang = currentLang === 'quechua' ? 'es' : 
                         currentLang === 'es' ? 'en' : 'quechua';
            welcomeText.textContent = messages[currentLang];
            welcomeText.classList.add('active');
        }, 500);
    }, 3000);

    // ===== BOTONES DE IDIOMA ===== //
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            window.location.href = `${lang}.html`;
        });
    });
});