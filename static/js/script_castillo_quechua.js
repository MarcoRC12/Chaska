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
    es: "Castillo de Lamas: “Adéntrate en un rincón mágico en pleno corazón del Amazonas: el Castillo de Lamas.",
    ingles: "Castle of Lamas: “Step into a magical corner in the very heart of the Amazon: the Castle of Lamas."
  },
  {
    start: 15.4,
    end: 33.5,
    es: "Esta imponente estructura de estilo medieval, única en el Perú, se alza majestuosa sobre las colinas de Lamas,",
    ingles: "This impressive medieval-style structure, unique in Peru, rises majestically above the hills of Lamas,"
  },
  {
    start: 33.5,
    end: 49,
    es: "ofreciendo una experiencia que mezcla historia, arte y fantasía.",
    ingles: "offering an experience that blends history, art, and fantasy."
  },
  {
    start: 49,
    end: 64,
    es: "Desde sus torres puedes observar paisajes impresionantes,",
    ingles: "From its towers, you can observe breathtaking landscapes,"
  },
  {
    start: 64,
    end: 77.6,
    es: "y en su interior encontrarás murales, esculturas y detalles que narran leyendas ancestrales y la visión de un sueño hecho realidad.",
    ingles: "and inside you'll find murals, sculptures, and details that tell ancestral legends and the vision of a dream come true."
  },
  {
    start: 77.6,
    end: 89.8,
    es: "Es un lugar donde lo europeo y lo amazónico se abrazan,",
    ingles: "It is a place where European and Amazonian worlds embrace,"
  },
  {
    start: 89.8,
    end: 98,
    es: "ideal para tomar fotografías inolvidables y vivir una experiencia que parece sacada de un cuento.",
    ingles: "perfect for taking unforgettable photos and living an experience that feels straight out of a fairy tale."
  }
];

const highlights = [
        { start: 0, end: 69 },
        { start: 10.1, end: 69 },
        { start: 20.1, end: 69 },
        { start: 27.8, end: 69 },
        { start: 41.1, end: 69 },
        { start: 49.5, end: 69 },
        { start: 59.2, end: 69 },
        { start: 69, end: 69 }
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