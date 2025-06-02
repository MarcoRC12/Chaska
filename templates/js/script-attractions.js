document.querySelectorAll('.attraction-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const attraction = btn.getAttribute('data-attraction');
        // Aquí puedes redirigir a una página detallada o mostrar un modal
        alert(`Redirigiendo a la página de: ${attraction}`);
    });
});