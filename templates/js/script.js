
// En tu script.js original (página principal)
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        window.location.href = `${lang}.html`;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // ===== AUDIO DE BIENVENIDA ===== //
    const audio = document.getElementById('welcome-audio');
    const audioHint = document.getElementById('audio-hint');
    audio.volume = 0.5;
    audioHint.style.display = 'none';

    // Función para reproducir el audio (con reinicio automático)
    const playAudio = () => {
        audio.play()
            .then(() => {
                console.log("Audio reproducido");
                audioHint.style.display = 'none';
                
                // Configurar reinicio cuando termine el audio
                audio.addEventListener('ended', () => {
                    audio.currentTime = 0; // Rebobinar al inicio
                    audio.play().catch(e => console.log("Error al relanzar audio:", e));
                }, { once: true });
            })
            .catch(e => {
                console.log("Audio bloqueado. Esperando interacción...");
                audioHint.style.display = 'block';
                
                const enableAudio = () => {
                    audio.play();
                    audioHint.style.display = 'none';
                    document.removeEventListener('click', enableAudio);
                    document.removeEventListener('keydown', enableAudio);
                    
                    // Configurar reinicio post-interacción
                    audio.addEventListener('ended', () => {
                        audio.currentTime = 0;
                        audio.play().catch(e => console.log("Error al relanzar audio:", e));
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