/**
 * Щучинск-Здоровье - Санаторий Website
 * Main JavaScript File
 * 
 * Features:
 * - Preloader
 * - Header scroll effects
 * - Mobile menu
 * - Parallax effect
 * - Scroll animations (Intersection Observer)
 * - Custom slider for rooms
 * - Accordion for services
 * - Masonry gallery with lightbox
 * - Form validation
 * - Smooth scroll
 */

(function() {
    'use strict';

    // ============================================
    // DOM Elements
    // ============================================
    const DOM = {
        preloader: document.getElementById('preloader'),
        header: document.getElementById('header'),
        burgerBtn: document.getElementById('burgerBtn'),
        mobileMenu: document.getElementById('mobileMenu'),
        bookingForm: document.getElementById('bookingForm'),
        sliderTrack: document.getElementById('sliderTrack'),
        sliderPrev: document.getElementById('sliderPrev'),
        sliderNext: document.getElementById('sliderNext'),
        sliderPagination: document.getElementById('sliderPagination'),
        accordion: document.getElementById('accordion'),
        masonryGrid: document.getElementById('masonryGrid'),
        lightbox: document.getElementById('lightbox'),
        lightboxImage: document.getElementById('lightboxImage'),
        lightboxCaption: document.getElementById('lightboxCaption'),
        lightboxClose: document.getElementById('lightboxClose'),
        lightboxPrev: document.getElementById('lightboxPrev'),
        lightboxNext: document.getElementById('lightboxNext')
    };

    // ============================================
    // Data
    // ============================================
    const roomsData = [
        {
            id: 1,
            title: 'Стандарт',
            description: 'Уютный номер с видом на сосновый лес. Идеально для пар. Площадь 28 м², кровать King Size, балкон.',
            price: '25 000',
            image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80'
        },
        {
            id: 2,
            title: 'Комфорт',
            description: 'Просторный номер с панорамными окнами и видом на озеро Щучье. Площадь 35 м², рабочая зона, мини-бар.',
            price: '35 000',
            image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80'
        },
        {
            id: 3,
            title: 'Люкс',
            description: 'Роскошный номер премиум-класса с гостиной и спальней. Площадь 55 м², джакузи, терраса с видом на горы.',
            price: '55 000',
            image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80'
        },
        {
            id: 4,
            title: 'Семейный',
            description: 'Двухкомнатный номер для семьи с детьми. Площадь 48 м², две спальни, кухня-гостиная, детская зона.',
            price: '45 000',
            image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80'
        },
        {
            id: 5,
            title: 'Президентский',
            description: 'Эксклюзивный люкс с панорамным видом. Площадь 85 м², камин, личный консьерж, приватная сауна.',
            price: '95 000',
            image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80'
        }
    ];

    const servicesData = [
        {
            title: 'СПА и Массаж',
            items: [
                { name: 'Массаж классический (60 мин)', price: '15 000 ₸' },
                { name: 'Массаж расслабляющий (90 мин)', price: '22 000 ₸' },
                { name: 'Стоун-терапия (60 мин)', price: '18 000 ₸' },
                { name: 'Ароматерапия (45 мин)', price: '12 000 ₸' },
                { name: 'Обёртывание лечебное', price: '10 000 ₸' }
            ]
        },
        {
            title: 'Бассейн и Сауна',
            items: [
                { name: 'Посещение бассейна (взрослый)', price: '5 000 ₸' },
                { name: 'Посещение бассейна (детский)', price: '3 000 ₸' },
                { name: 'Финская сауна (час)', price: '8 000 ₸' },
                { name: 'Турецкий хаммам (час)', price: '10 000 ₸' },
                { name: 'Аренда VIP-зоны бассейна', price: '25 000 ₸' }
            ]
        },
        {
            title: 'Лечебные Процедуры',
            items: [
                { name: 'Грязелечение (оз. Молочное)', price: '7 000 ₸' },
                { name: 'Минеральные ванны', price: '6 000 ₸' },
                { name: 'Гидромассаж', price: '8 000 ₸' },
                { name: 'Соляная пещера (сеанс)', price: '4 000 ₸' },
                { name: 'Консультация врача', price: '12 000 ₸' }
            ]
        },
        {
            title: 'Спорт и Активность',
            items: [
                { name: 'Тренажерный зал', price: 'Бесплатно' },
                { name: 'Йога-класс (групповой)', price: '3 000 ₸' },
                { name: 'Персональный тренер (час)', price: '15 000 ₸' },
                { name: 'Прокат велосипедов', price: '2 000 ₸/час' },
                { name: 'Экскурсия к горе Кокше', price: '8 000 ₸' }
            ]
        }
    ];

    const galleryImages = [
        { src: 'https://images.unsplash.com/photo-1571896349842-6e53ce41e8f2?w=800&q=80', caption: 'Озеро Щучье на закате', tall: true },
        { src: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80', caption: 'Территория санатория', tall: false },
        { src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', caption: 'СПА-зона', tall: true },
        { src: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80', caption: 'Бассейн с видом на горы', tall: false },
        { src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80', caption: 'Номер Люкс', tall: false },
        { src: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80', caption: 'Ресторан', tall: true },
        { src: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80', caption: 'Горы Кокшетау', tall: false },
        { src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80', caption: 'Массажный кабинет', tall: false },
        { src: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80', caption: 'Чингиз-Ауль', wide: true },
        { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', caption: 'Пляж озера Щучье', tall: true },
        { src: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80', caption: 'Сосновый лес', tall: false },
        { src: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80', caption: 'Зона отдыха', tall: false }
    ];

    // State variables
    let currentSlide = 0;
    let currentLightboxIndex = 0;
    let slidesPerView = 1;

    // ============================================
    // Utility Functions
    // ============================================
    
    /**
     * Debounce function for resize events
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Set minimum date for booking form (today)
     */
    function setMinDate() {
        const today = new Date().toISOString().split('T')[0];
        const checkInInput = document.getElementById('checkIn');
        const checkOutInput = document.getElementById('checkOut');
        
        if (checkInInput) checkInInput.min = today;
        if (checkOutInput) checkOutInput.min = today;
    }

    // ============================================
    // Preloader
    // ============================================
    function initPreloader() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                DOM.preloader.classList.add('preloader--hidden');
                setTimeout(() => {
                    DOM.preloader.style.display = 'none';
                }, 500);
            }, 800);
        });
    }

    // ============================================
    // Header & Mobile Menu
    // ============================================
    function initHeader() {
        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                DOM.header.classList.add('header--scrolled');
            } else {
                DOM.header.classList.remove('header--scrolled');
            }
        });

        // Mobile menu toggle
        DOM.burgerBtn.addEventListener('click', () => {
            DOM.burgerBtn.classList.toggle('header__burger--active');
            DOM.mobileMenu.classList.toggle('mobile-menu--active');
            document.body.style.overflow = DOM.mobileMenu.classList.contains('mobile-menu--active') ? 'hidden' : '';
        });

        // Close mobile menu on link click
        const mobileLinks = DOM.mobileMenu.querySelectorAll('.mobile-menu__link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                DOM.burgerBtn.classList.remove('header__burger--active');
                DOM.mobileMenu.classList.remove('mobile-menu--active');
                document.body.style.overflow = '';
            });
        });

        // Book buttons redirect to booking form
        const bookButtons = document.querySelectorAll('.header__btn, #mobileBookBtn');
        bookButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    // ============================================
    // Parallax Effect
    // ============================================
    function initParallax() {
        const parallaxElements = document.querySelectorAll('.parallax-bg');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // ============================================
    // Scroll Animations (Intersection Observer)
    // ============================================
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay || 0;
                    
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => observer.observe(el));
    }

    // ============================================
    // Rooms Slider
    // ============================================
    function createRoomCard(room) {
        return `
            <div class="slider__slide">
                <article class="room-card">
                    <img src="${room.image}" alt="${room.title}" class="room-card__image" loading="lazy">
                    <div class="room-card__content">
                        <h3 class="room-card__title">${room.title}</h3>
                        <p class="room-card__description">${room.description}</p>
                        <div class="room-card__footer">
                            <div class="room-card__price">
                                ${room.price} <span>₸ / ночь</span>
                            </div>
                            <button class="btn btn--gold" onclick="document.getElementById('bookingForm').scrollIntoView({behavior: 'smooth'})">
                                Подробнее
                            </button>
                        </div>
                    </div>
                </article>
            </div>
        `;
    }

    function updateSlider() {
        const slideWidth = 100 / slidesPerView;
        const offset = -currentSlide * slideWidth;
        DOM.sliderTrack.style.transform = `translateX(${offset}%)`;
        
        // Update pagination
        const dots = DOM.sliderPagination.querySelectorAll('.slider__dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('slider__dot--active', index === currentSlide);
        });
    }

    function createPagination(totalSlides) {
        DOM.sliderPagination.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'slider__dot';
            dot.setAttribute('aria-label', `Слайд ${i + 1}`);
            dot.addEventListener('click', () => {
                currentSlide = i;
                updateSlider();
            });
            DOM.sliderPagination.appendChild(dot);
        }
    }

    function initSlider() {
        // Calculate slides per view based on screen width
        function calculateSlidesPerView() {
            if (window.innerWidth >= 1024) {
                slidesPerView = 3;
            } else if (window.innerWidth >= 768) {
                slidesPerView = 2;
            } else {
                slidesPerView = 1;
            }
        }

        // Render room cards
        DOM.sliderTrack.innerHTML = roomsData.map(createRoomCard).join('');
        
        calculateSlidesPerView();
        createPagination(Math.ceil(roomsData.length / slidesPerView));
        updateSlider();

        // Navigation buttons
        DOM.sliderPrev.addEventListener('click', () => {
            const maxSlide = Math.ceil(roomsData.length / slidesPerView) - 1;
            currentSlide = currentSlide <= 0 ? maxSlide : currentSlide - 1;
            updateSlider();
        });

        DOM.sliderNext.addEventListener('click', () => {
            const maxSlide = Math.ceil(roomsData.length / slidesPerView) - 1;
            currentSlide = currentSlide >= maxSlide ? 0 : currentSlide + 1;
            updateSlider();
        });

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        DOM.sliderTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        DOM.sliderTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    DOM.sliderNext.click();
                } else {
                    // Swipe right - prev slide
                    DOM.sliderPrev.click();
                }
            }
        }

        // Resize handler
        window.addEventListener('resize', debounce(() => {
            calculateSlidesPerView();
            createPagination(Math.ceil(roomsData.length / slidesPerView));
            currentSlide = 0;
            updateSlider();
        }, 300));
    }

    // ============================================
    // Services Accordion
    // ============================================
    function createAccordionItem(service, index) {
        const pricesHtml = service.items.map(item => `
            <div class="service-price">
                <span class="service-price__name">${item.name}</span>
                <span class="service-price__cost">${item.price}</span>
            </div>
        `).join('');

        return `
            <div class="accordion__item ${index === 0 ? 'accordion__item--active' : ''}">
                <button class="accordion__header" aria-expanded="${index === 0}">
                    <h3 class="accordion__title">${service.title}</h3>
                    <div class="accordion__icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 9l6 6 6-6"/>
                        </svg>
                    </div>
                </button>
                <div class="accordion__content" style="${index === 0 ? 'max-height: 500px;' : ''}">
                    <div class="accordion__body">
                        ${pricesHtml}
                    </div>
                </div>
            </div>
        `;
    }

    function initAccordion() {
        DOM.accordion.innerHTML = servicesData.map(createAccordionItem).join('');

        const accordionHeaders = DOM.accordion.querySelectorAll('.accordion__header');
        
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const item = header.closest('.accordion__item');
                const content = item.querySelector('.accordion__content');
                const isActive = item.classList.contains('accordion__item--active');

                // Close all items
                DOM.accordion.querySelectorAll('.accordion__item').forEach(accItem => {
                    accItem.classList.remove('accordion__item--active');
                    accItem.querySelector('.accordion__content').style.maxHeight = '0';
                    accItem.querySelector('.accordion__header').setAttribute('aria-expanded', 'false');
                });

                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('accordion__item--active');
                    content.style.maxHeight = content.scrollHeight + 'px';
                    header.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }

    // ============================================
    // Gallery & Lightbox
    // ============================================
    function createGalleryItem(image, index) {
        const classes = ['masonry-item'];
        if (image.tall) classes.push('masonry-item--tall');
        if (image.wide) classes.push('masonry-item--wide');

        return `
            <div class="${classes.join(' ')}" data-index="${index}">
                <img src="${image.src}" alt="${image.caption}" loading="lazy">
                <div class="masonry-item__overlay">
                    <div class="masonry-item__icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                        </svg>
                    </div>
                </div>
            </div>
        `;
    }

    function openLightbox(index) {
        currentLightboxIndex = index;
        const image = galleryImages[index];
        
        DOM.lightboxImage.src = image.src;
        DOM.lightboxImage.alt = image.caption;
        DOM.lightboxCaption.textContent = image.caption;
        DOM.lightbox.classList.add('lightbox--active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        DOM.lightbox.classList.remove('lightbox--active');
        document.body.style.overflow = '';
    }

    function navigateLightbox(direction) {
        currentLightboxIndex += direction;
        
        if (currentLightboxIndex < 0) {
            currentLightboxIndex = galleryImages.length - 1;
        } else if (currentLightboxIndex >= galleryImages.length) {
            currentLightboxIndex = 0;
        }
        
        const image = galleryImages[currentLightboxIndex];
        DOM.lightboxImage.src = image.src;
        DOM.lightboxImage.alt = image.caption;
        DOM.lightboxCaption.textContent = image.caption;
    }

    function initGallery() {
        // Render gallery
        DOM.masonryGrid.innerHTML = galleryImages.map(createGalleryItem).join('');

        // Open lightbox on click
        const galleryItems = DOM.masonryGrid.querySelectorAll('.masonry-item');
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const index = parseInt(item.dataset.index);
                openLightbox(index);
            });
        });

        // Lightbox controls
        DOM.lightboxClose.addEventListener('click', closeLightbox);
        DOM.lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateLightbox(-1);
        });
        DOM.lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateLightbox(1);
        });

        // Close on background click
        DOM.lightbox.addEventListener('click', (e) => {
            if (e.target === DOM.lightbox) {
                closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!DOM.lightbox.classList.contains('lightbox--active')) return;

            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    navigateLightbox(-1);
                    break;
                case 'ArrowRight':
                    navigateLightbox(1);
                    break;
            }
        });
    }

    // ============================================
    // Booking Form Validation
    // ============================================
    function validateBookingForm() {
        DOM.bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const checkIn = document.getElementById('checkIn').value;
            const checkOut = document.getElementById('checkOut').value;
            const guests = document.getElementById('guests').value;
            
            // Basic validation
            if (!checkIn || !checkOut) {
                alert('Пожалуйста, выберите даты заезда и выезда');
                return;
            }
            
            const checkInDate = new Date(checkIn);
            const checkOutDate = new Date(checkOut);
            
            if (checkOutDate <= checkInDate) {
                alert('Дата выезда должна быть позже даты заезда');
                return;
            }
            
            // Success - in real app would send to server
            alert(`Спасибо за заявку!\n\nДаты: ${checkIn} - ${checkOut}\nГостей: ${guests}\n\nНаш менеджер свяжется с вами в ближайшее время.`);
            DOM.bookingForm.reset();
        });
    }

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ============================================
    // Initialize All
    // ============================================
    function init() {
        setMinDate();
        initPreloader();
        initHeader();
        initParallax();
        initScrollAnimations();
        initSlider();
        initAccordion();
        initGallery();
        validateBookingForm();
        initSmoothScroll();
        
        console.log('Щучинск-Здоровье website initialized successfully!');
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
