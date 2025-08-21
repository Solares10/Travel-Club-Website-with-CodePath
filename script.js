// =====================
// Theme Toggle Logic
// =====================
const toggleButton = document.getElementById('toggle-theme');

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
    toggleButton.textContent = "☀️ Toggle Theme";
  } else {
    localStorage.setItem('theme', 'light');
    toggleButton.textContent = "🌙 Toggle Theme";
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    toggleButton.textContent = "☀️ Toggle Theme";
  }
});

// =====================
// Slideshow Logic
// =====================
const slides = document.querySelectorAll('.carousel-img');
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

setInterval(nextSlide, 3000);

// =====================
// RSVP Form Logic
// =====================
const form = document.getElementById('rsvp-form');
const nameInput = document.getElementById('rsvp-name');
const emailInput = document.getElementById('rsvp-email');
const guestInput = document.getElementById('rsvp-guest');
const rsvpList = document.getElementById('rsvp-list');

let rsvps = JSON.parse(localStorage.getItem('rsvpData')) || [];

const modal = document.getElementById('rsvp-modal');
const modalName = document.getElementById('modal-name');
const closeModal = document.getElementById('close-modal');
const modalImage = document.getElementById('modal-image');

function renderRSVPs() {
  rsvpList.innerHTML = '';
  rsvps.forEach(entry => {
    const item = document.createElement('li');
    item.textContent = entry.text;
    rsvpList.appendChild(item);
  });
}
renderRSVPs();

form.addEventListener('submit', function (e) {
  e.preventDefault();

  [nameInput, emailInput, guestInput].forEach(input => input.classList.remove('error'));

  let valid = true;
  if (!nameInput.value.trim()) {
    nameInput.classList.add('error');
    valid = false;
  }
  if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
    emailInput.classList.add('error');
    valid = false;
  }
  if (!guestInput.value.trim()) {
    guestInput.classList.add('error');
    valid = false;
  }

  if (valid) {
    const name = nameInput.value.trim();
    const bringingGuest = guestInput.value.trim().toLowerCase() === 'yes';
    const displayText = `${name} ${bringingGuest ? '+ Guest' : ''}`;

    const newItem = document.createElement('li');
    newItem.textContent = displayText;
    rsvpList.appendChild(newItem);

    rsvps.push({ text: displayText });
    localStorage.setItem('rsvpData', JSON.stringify(rsvps));

    form.reset();

    modalName.textContent = name;

    modalImage.classList.remove('show');
    void modalImage.offsetWidth;
    modalImage.classList.add('show');

    modal.classList.remove('show');
    void modal.offsetWidth;
    modal.classList.add('show');
    modal.style.display = 'block';

    setTimeout(() => {
      modal.style.display = 'none';
      modal.classList.remove('show');
    }, 4000);
  }
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
  modal.classList.remove('show');
});

const reduceMotionBtn = document.getElementById('reduce-motion');
if (reduceMotionBtn) {
  reduceMotionBtn.addEventListener('click', () => {
    if (modalImage.style.animationPlayState === 'paused') {
      modalImage.style.animationPlayState = 'running';
    } else {
      modalImage.style.animationPlayState = 'paused';
    }
  });
}

const style = document.createElement('style');
style.textContent = `
  .error {
    border: 2px solid red !important;
  }
`;
document.head.appendChild(style);

// =====================
// Contact Form Logic (POPUP like RSVP)
// =====================
const contactModal = document.createElement('div');
contactModal.id = 'contact-modal';
contactModal.className = 'modal';
contactModal.style.display = 'none';
contactModal.innerHTML = `
  <div class="modal-content">
    <span id="close-contact-modal" class="close-btn">&times;</span>
    <h2>Thank You!</h2>
    <p>Your message has been sent. We'll get back to you soon! 💌</p>
    <img src="airplane.png" alt="Thank you image" style="width: 200px; margin-top: 20px;">
  </div>
`;
document.body.appendChild(contactModal);

const closeContactModal = document.getElementById('close-contact-modal');
const contactForm = document.getElementById('contact-form');

function handleContactSubmit(event) {
  event.preventDefault();

  contactModal.classList.remove('show');
  void contactModal.offsetWidth;
  contactModal.classList.add('show');
  contactModal.style.display = 'block';

  contactForm.style.display = 'none';

  setTimeout(() => {
    contactModal.style.display = 'none';
    contactModal.classList.remove('show');
    contactForm.reset();
    contactForm.style.display = 'block';
  }, 4000);
}

closeContactModal.addEventListener('click', () => {
  contactModal.style.display = 'none';
  contactModal.classList.remove('show');
  contactForm.reset();
  contactForm.style.display = 'block';
});

function scrollToHome() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
