// script.js - Interactive elements for Desa Pansor website

// Mobile menu toggle (if needed in the future)
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// Form validation for pengaduan.html
function validateForm() {
    const name = document.getElementById('name').value;
    const nik = document.getElementById('nik').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const category = document.getElementById('category').value;
    const subject = document.getElementById('subject').value;
    const description = document.getElementById('description').value;
    const privacy = document.getElementById('privacy').checked;

    if (!name || !nik || !address || !phone || !category || !subject || !description || !privacy) {
        alert('Harap lengkapi semua field yang wajib diisi.');
        return false;
    }

    // Basic NIK validation (16 digits)
    if (!/^\d{16}$/.test(nik)) {
        alert('NIK harus terdiri dari 16 digit angka.');
        return false;
    }

    // Basic phone validation
    if (!/^\d{10,13}$/.test(phone.replace(/\D/g, ''))) {
        alert('Nomor telepon tidak valid.');
        return false;
    }

    alert('Pengaduan berhasil dikirim. Terima kasih atas partisipasi Anda.');
    return true;
}

// Image gallery lightbox effect
function openLightbox(imgSrc, altText) {
    const lightbox = document.createElement('div');
    lightbox.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
    lightbox.innerHTML = `
        <div class="max-w-4xl max-h-full p-4">
            <img src="${imgSrc}" alt="${altText}" class="max-w-full max-h-full">
            <button onclick="this.parentElement.parentElement.remove()" class="absolute top-4 right-4 text-white text-2xl">&times;</button>
        </div>
    `;
    document.body.appendChild(lightbox);
}

// Add click event to gallery images
document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
    }

    const galleryImages = document.querySelectorAll('.gallery-item img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function () {
            openLightbox(this.src, this.alt);
        });
    });

    // Form submission for pengaduan
    const complaintForm = document.querySelector('form');
    if (complaintForm) {
        complaintForm.addEventListener('submit', function (e) {
            if (!validateForm()) {
                e.preventDefault();
            }
        });
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation to service cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    const serviceCards = document.querySelectorAll('.bg-gray-100');
    serviceCards.forEach(card => {
        observer.observe(card);
    });

    // Add click event to UMKM images for toggling products
    const umkmImages = document.querySelectorAll('.umkm-item img');
    umkmImages.forEach(img => {
        img.addEventListener('click', function () {
            toggleProducts(this);
        });
    });
});

// Add some CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
        animation: fadeIn 0.6s ease-out forwards;
    }
`;
document.head.appendChild(style);

// Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Call lazy loading on page load
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Newsletter subscription (placeholder)
function subscribeNewsletter(email) {
    // This would typically send data to a server
    alert(`Terima kasih! ${email} telah berhasil berlangganan newsletter Desa Pansor.`);
}

// Search functionality (placeholder)
function searchContent(query) {
    // This would typically search through content
    alert(`Mencari: ${query}. Fitur pencarian akan segera hadir!`);
}

// Modal functionality
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// Gallery auto-scroll functionality
document.addEventListener('DOMContentLoaded', function () {
    const gallerySlides = document.getElementById('gallery-slides');
    if (gallerySlides) {
        const slides = gallerySlides.children;
        const slideWidth = slides[0].offsetWidth + 16; // width + margin (mx-2 = 8px each side)
        let currentPosition = 0;
        const totalSlides = slides.length;
        const visibleSlides = Math.floor(gallerySlides.parentElement.offsetWidth / slideWidth);
        const maxPosition = (totalSlides - visibleSlides) * slideWidth;

        function autoScroll() {
            currentPosition += slideWidth;
            if (currentPosition > maxPosition) {
                currentPosition = 0;
            }
            gallerySlides.style.transform = `translateX(-${currentPosition}px)`;
        }

        // Auto-scroll every 3 seconds
        setInterval(autoScroll, 3000);
    }
});

// Toggle products visibility
function toggleProducts(imgElement) {
    const umkmItem = imgElement.closest('.umkm-item');
    const productsList = umkmItem.querySelector('.products-list');
    if (productsList) {
        productsList.classList.toggle('hidden');
    }
}

// Accessibility improvements
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        // Close lightbox
        const lightbox = document.querySelector('.fixed.inset-0');
        if (lightbox) {
            lightbox.remove();
        }

        // Close modals
        const openModals = document.querySelectorAll('.fixed.inset-0:not(.hidden)');
        openModals.forEach(modal => {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    }
});
