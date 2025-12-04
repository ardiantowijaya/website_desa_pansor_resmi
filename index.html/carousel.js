// Carousel functionality for automatic background banner
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Auto-slide every 5 seconds
    setInterval(nextSlide, 5000);

    // Initialize first slide
    if (slides.length > 0) {
        showSlide(0);
    }
});
