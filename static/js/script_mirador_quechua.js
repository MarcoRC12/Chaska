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
          end: 9.6,
          es: "Mirador de Lamas: Contempla la belleza infinita del paisaje amazónico desde el Mirador de Lamas,",
          ingles: "Mirador de Lamas: Contemplate the infinite beauty of the Amazonian landscape from the Mirador de Lamas,"
        },
        {
          start: 9.6,
          end: 17.4,
          es: "un punto perfecto para respirar aire puro y dejarte maravillar por la vista panorámica del bosque,",
          ingles: "a perfect spot to breathe fresh air and marvel at the panoramic view of the forest,"
        },
        {
          start: 17.4,
          end: 25.25,
          es: "los cerros y los tejados rojizos de la ciudad.",
          ingles: "the hills and the reddish roofs of the city."
        },
        {
          start: 25.25,
          end: 32.55,
          es: "Es el lugar ideal para una pausa reflexiva, una sesión fotográfica al atardecer",
          ingles: "It is the ideal place for a reflective pause or a sunset photo session,"
        },
        {
          start: 32.55,
          end: 41.9,
          es: "o simplemente para dejar que el viento te cuente los secretos de la selva.",
          ingles: "or simply to let the wind tell you the secrets of the jungle."
        },
        {
          start: 41.9,
          end: 50.4,
          es: "El Mirador es más que un punto de observación:",
          ingles: "The Mirador is more than just a viewpoint:"
        },
        {
          start: 50.4,
          end: 57.3,
          es: "es una invitación a ver la vida desde otra perspectiva,",
          ingles: "it is an invitation to see life from another perspective,"
        },
        {
          start: 57.3,
          end: 66.2,
          es: "donde naturaleza y tranquilidad se funden",
          ingles: "where nature and tranquility merge"
        },
        {
          start: 66.2,
          end: 71,
          es: "en un mismo instante.",
          ingles: "in a single instant."
        }
      ];


      const highlights = [
        { start: 0, end: 71 },
        { start: 9.6, end: 71 },
        { start: 17.4, end: 71 },
        { start: 25.25, end: 71 },
        { start: 32.55, end: 71 },
        { start: 41.9, end: 71 },
        { start: 50.4, end: 71 },
        { start: 57.3, end: 71 },
        { start: 66.2, end: 71 }
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