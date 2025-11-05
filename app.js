// Presentation state
let currentSlide = 1;
const totalSlides = 22;

// Elements
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentSlideEl = document.getElementById('currentSlide');
const totalSlidesEl = document.getElementById('totalSlides');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const exportBtn = document.getElementById('exportBtn');
const exportModal = document.getElementById('exportModal');
const closeModal = document.getElementById('closeModal');
const presentationContainer = document.querySelector('.presentation-container');

// Initialize
function init() {
  totalSlidesEl.textContent = totalSlides;
  updateSlide();
}

// Update slide display
function updateSlide() {
  slides.forEach((slide, index) => {
    if (index + 1 === currentSlide) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });
  
  currentSlideEl.textContent = currentSlide;
  
  // Update button states
  prevBtn.disabled = currentSlide === 1;
  nextBtn.disabled = currentSlide === totalSlides;
}

// Navigate to specific slide
function goToSlide(slideNumber) {
  if (slideNumber >= 1 && slideNumber <= totalSlides) {
    currentSlide = slideNumber;
    updateSlide();
  }
}

// Previous slide
function previousSlide() {
  if (currentSlide > 1) {
    currentSlide--;
    updateSlide();
  }
}

// Next slide
function nextSlide() {
  if (currentSlide < totalSlides) {
    currentSlide++;
    updateSlide();
  }
}

// Fullscreen toggle
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    presentationContainer.requestFullscreen().then(() => {
      presentationContainer.classList.add('fullscreen');
      fullscreenBtn.textContent = '⛶ Exit Fullscreen';
    }).catch(err => {
      console.log('Error attempting to enable fullscreen:', err);
    });
  } else {
    document.exitFullscreen().then(() => {
      presentationContainer.classList.remove('fullscreen');
      fullscreenBtn.textContent = '⛶ Fullscreen';
    });
  }
}

// Show export modal
function showExportModal() {
  exportModal.classList.add('active');
}

// Hide export modal
function hideExportModal() {
  exportModal.classList.remove('active');
}

// Event listeners
prevBtn.addEventListener('click', previousSlide);
nextBtn.addEventListener('click', nextSlide);
fullscreenBtn.addEventListener('click', toggleFullscreen);
exportBtn.addEventListener('click', showExportModal);
closeModal.addEventListener('click', hideExportModal);

// Close modal when clicking outside
exportModal.addEventListener('click', (e) => {
  if (e.target === exportModal) {
    hideExportModal();
  }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  switch(e.key) {
    case 'ArrowLeft':
    case 'ArrowUp':
      previousSlide();
      break;
    case 'ArrowRight':
    case 'ArrowDown':
    case ' ':
      e.preventDefault();
      nextSlide();
      break;
    case 'Home':
      goToSlide(1);
      break;
    case 'End':
      goToSlide(totalSlides);
      break;
    case 'f':
    case 'F':
      toggleFullscreen();
      break;
    case 'Escape':
      if (exportModal.classList.contains('active')) {
        hideExportModal();
      }
      break;
  }
});

// Click to advance (but not on buttons or controls)
slides.forEach(slide => {
  slide.addEventListener('click', (e) => {
    if (!e.target.closest('button') && !e.target.closest('.controls')) {
      nextSlide();
    }
  });
});

// Handle fullscreen change
document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    presentationContainer.classList.remove('fullscreen');
    fullscreenBtn.textContent = '⛶ Fullscreen';
  }
});

// Initialize presentation
init();