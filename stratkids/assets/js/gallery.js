/**
 * STRATKIDS - Gallery & Lightbox Viewer
 * Filter by Category (Chess, Strategy Games, Tournaments, Team, Outdoor)
 * Interactive modal lightbox with navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item-wrap');
  const lightboxModal = document.getElementById('stratkidsLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.querySelector('.sk-lightbox-close');

  let currentVisibleItems = [];
  let currentIndex = 0;

  // Filter functionality
  function filterGallery(category) {
    currentVisibleItems = [];
    galleryItems.forEach(item => {
      const itemCat = item.getAttribute('data-category');
      if (category === 'all' || itemCat === category) {
        item.style.display = '';
        currentVisibleItems.push(item);
      } else {
        item.style.display = 'none';
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterGallery(btn.getAttribute('data-filter'));
    });
  });

  // Initial population of visible items
  currentVisibleItems = Array.from(galleryItems);

  // Lightbox functionality
  galleryItems.forEach(item => {
    const trigger = item.querySelector('.gallery-item');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const img = trigger.querySelector('img');
        const title = trigger.querySelector('.gallery-overlay-title');
        const cat = trigger.querySelector('.gallery-overlay-cat');

        if (lightboxModal && lightboxImg && img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt || 'StratKids Camp Gallery Photo';
          if (lightboxCaption) {
            lightboxCaption.innerHTML = `<strong>${title ? title.innerText : ''}</strong> <span class="badge bg-secondary ms-2">${cat ? cat.innerText : ''}</span>`;
          }
          lightboxModal.classList.add('active');
          document.body.style.overflow = 'hidden';
          currentIndex = currentVisibleItems.indexOf(item);
        }
      });
    }
  });

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  // Keyboard controls (Esc, Arrow keys)
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight' && currentVisibleItems.length > 0) {
      currentIndex = (currentIndex + 1) % currentVisibleItems.length;
      updateLightboxContent();
    }
    if (e.key === 'ArrowLeft' && currentVisibleItems.length > 0) {
      currentIndex = (currentIndex - 1 + currentVisibleItems.length) % currentVisibleItems.length;
      updateLightboxContent();
    }
  });

  function updateLightboxContent() {
    const item = currentVisibleItems[currentIndex];
    if (!item) return;
    const img = item.querySelector('img');
    const title = item.querySelector('.gallery-overlay-title');
    const cat = item.querySelector('.gallery-overlay-cat');
    if (lightboxImg && img) {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      if (lightboxCaption) {
        lightboxCaption.innerHTML = `<strong>${title ? title.innerText : ''}</strong> <span class="badge bg-secondary ms-2">${cat ? cat.innerText : ''}</span>`;
      }
    }
  }
});
