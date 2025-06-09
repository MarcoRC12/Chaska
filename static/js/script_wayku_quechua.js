  // Cambiar imagen cada 4 segundos
  let currentImageIndex = 0;
  const images = document.querySelectorAll('.carousel-image');
  const totalImages = images.length;

  function changeImage() {
    // Ocultar la imagen actual
    images[currentImageIndex].style.display = 'none';
    // Incrementar el índice y asegurarse de que se reinicie cuando llegue al final
    currentImageIndex = (currentImageIndex + 1) % totalImages;
    // Mostrar la siguiente imagen
    images[currentImageIndex].style.display = 'block';
  }

  // Cambiar la imagen cada 4 segundos
  setInterval(changeImage, 2000);  // Cambiar cada 4000 milisegundos (4 segundos)
document.addEventListener('DOMContentLoaded', () => {
      const audio = document.getElementById('welcome-audio');
      const subtitleEs = document.getElementById('subtitle-es');
      const subtitleEn = document.getElementById('subtitle-en');
      const audioHint = document.getElementById('audio-hint');
      const highlightTextSpans = document.querySelectorAll('#highlight-text span');

      const subtitles = [
  {
    start: 0,
    end: 15.4,
    es: "Comunidad el wayku, vive el alma viva de Lamas en la comunidad El Wayku, hogar del pueblo quechua-lamista.",
    ingles: "El Wayku community: “Live the living soul of Lamas in the community of El Wayku, home of the Quechua-Lamista people."

  },
  {
    start: 15.4,
    end: 33.5,
    es: "Aquí no solo conocerás sus tradiciones, sino que serás parte de ellas.",
    ingles: "Here you will not only learn about their traditions, but become part of them."
  },
  {
    start: 33.5,
    end: 49,
   es: "Caminando por sus calles, escucharás el idioma ancestral",
    ingles: "Walking through its streets, you will hear the ancestral language"

  },
  {
    start: 49,
    end: 64,
    es: "verás sus coloridos atuendos típicos y descubrirás rituales, danzas, comidas y",
    ingles: "you will see their colorful traditional outfits and discover rituals, dances, food and"
  },
  {
    start: 64,
    end: 77.6,
    es: "relatos transmitidos de generación en generación.",
    ingles: "stories passed down from generation to generation."
  },
  {
    start: 77.6,
    end: 89.8,
    es: "Si buscas turismo auténtico y transformador,",
    ingles: "If you seek authentic and transformative tourism,"
  },
  {
    start: 89.8,
    end: 98,
    es: "El Wayku es una experiencia que toca el corazón.”",
    ingles: " El Wayku is an experience that touches the heart.”"
  }
];


      const highlights = [
        { start: 0, end: 98 },
        { start: 15.4, end: 98 },
        { start: 33.5, end: 98 },
        { start: 49, end: 98 },
        { start: 64, end: 98 },
        { start: 77.6, end: 98 },
        { start: 89.8, end: 98 },
        { start: 98, end: 98 }
      ];

      function updateSubtitles() {
    const currentTime = audio.currentTime;
    const subtitle = subtitles.find(s => currentTime >= s.start && currentTime < s.end);
    if (subtitle) {
      subtitleEn.textContent = subtitle.ingles;
      subtitleEs.textContent = subtitle.es;
    } else {
      subtitleEn.textContent = '';
      subtitleEs.textContent = '';
    }
  }
  function updateHighlight() {
    const currentTime = audio.currentTime;
    highlights.forEach(({ start, end }, index) => {
      if (currentTime >= start && currentTime < end) {
        highlightTextSpans[index].classList.add('highlighted');
      } else {
        highlightTextSpans[index].classList.remove('highlighted');
      }
    });
  }

      audio.volume = 0.5;
  audio.play().then(() => {
    audioHint.style.display = 'none';
  }).catch(() => {
    audioHint.style.display = 'block';

    const enableAudio = () => {
      audio.play();
      audioHint.style.display = 'none';
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('keydown', enableAudio);
    };

    document.addEventListener('click', enableAudio);
    document.addEventListener('keydown', enableAudio);
  });

  audio.addEventListener('timeupdate', () => {
    updateSubtitles();
    updateHighlight();
  });

  audio.addEventListener('pause', () => {
    subtitleEn.textContent = '';
    subtitleEs.textContent = '';
    highlightTextSpans.forEach(span => span.classList.remove('highlighted'));
  });

  audio.addEventListener('ended', () => {
    subtitleEn.textContent = '';
    subtitleEs.textContent = '';
    highlightTextSpans.forEach(span => span.classList.remove('highlighted'));
  });
});