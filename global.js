// Global JavaScript if needed
document.addEventListener('DOMContentLoaded', () => {
    // Accordion functionality for FAQ
    const details = document.querySelectorAll("details");
    details.forEach((targetDetail) => {
        targetDetail.addEventListener("click", () => {
            details.forEach((detail) => {
                if (detail !== targetDetail) {
                    detail.removeAttribute("open");
                }
            });
        });
    });
});

document.querySelectorAll(".cap-card").forEach(card => {
    const readMoreBtn = card.querySelector(".read-more");

    readMoreBtn.addEventListener("click", (e) => {
        e.preventDefault();

        card.classList.toggle("expanded");

        readMoreBtn.textContent =
            card.classList.contains("expanded") ? "Read less" : "Read more";
    });
});

// header-section
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const links = document.querySelectorAll('.mobile-nav-list a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('is-active');
        mobileMenu.classList.toggle('active');

        // Disable body scroll when menu is open
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // Close menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('is-active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
});

// testimonials-section
document.addEventListener('DOMContentLoaded', function () {

    const initTestimonials = () => {
        if (window.innerWidth >= 768) {
            removeMobileCarousel();
            initInfiniteScroll();
        } else {
            removeInfiniteScroll();
            initMobileCarousel();
        }
    };

    initTestimonials();

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initTestimonials, 250);
    });
});

/* ========================================
   DESKTOP: TWO COLUMN INFINITE SCROLL
   ======================================== */
function initInfiniteScroll() {
    const columns = document.querySelectorAll('.testi-col');

    columns.forEach(column => {
        if (column.classList.contains('scroll-initialized')) return;

        const cards = Array.from(column.querySelectorAll('.testi-card'));
        if (!cards.length) return;

        const inner = document.createElement('div');
        inner.className = 'testi-col-inner';

        cards.forEach(card => inner.appendChild(card.cloneNode(true)));
        cards.forEach(card => inner.appendChild(card.cloneNode(true)));

        column.innerHTML = '';
        column.appendChild(inner);
        column.classList.add('scroll-initialized');
    });
}

function removeInfiniteScroll() {
    const columns = document.querySelectorAll('.testi-col');

    columns.forEach(column => {
        if (!column.classList.contains('scroll-initialized')) return;

        const inner = column.querySelector('.testi-col-inner');
        if (!inner) return;

        const cards = Array.from(inner.querySelectorAll('.testi-card'));
        const originalCount = cards.length / 2;

        column.innerHTML = '';
        for (let i = 0; i < originalCount; i++) {
            column.appendChild(cards[i]);
        }

        column.classList.remove('scroll-initialized');
    });
}

/* ========================================
   MOBILE: SINGLE COLUMN VERTICAL CAROUSEL
   ======================================== */
function initMobileCarousel() {
    const grid = document.querySelector('.testi-grid');
    if (!grid || grid.classList.contains('mobile-carousel')) return;

    const allCards = Array.from(grid.querySelectorAll('.testi-card'));
    if (!allCards.length) return;

    const mobileCol = document.createElement('div');
    mobileCol.className = 'testi-col mobile-carousel';

    const inner = document.createElement('div');
    inner.className = 'testi-col-inner mobile-carousel-inner';

    allCards.forEach(card => inner.appendChild(card.cloneNode(true)));
    allCards.forEach(card => inner.appendChild(card.cloneNode(true)));

    mobileCol.appendChild(inner);

    grid.innerHTML = '';
    grid.appendChild(mobileCol);
}

function removeMobileCarousel() {
    const grid = document.querySelector('.testi-grid');
    if (!grid || !grid.classList.contains('mobile-carousel')) return;

    const cards = Array.from(grid.querySelectorAll('.testi-card'));
    const half = cards.length / 2;

    grid.innerHTML = `
        <div class="testi-col"></div>
        <div class="testi-col"></div>
    `;

    const cols = grid.querySelectorAll('.testi-col');
    cards.slice(0, half).forEach((card, i) => {
        cols[i % 2].appendChild(card);
    });

    grid.classList.remove('mobile-carousel');
}
