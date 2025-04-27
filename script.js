// --- Event Handling: Button ---
const eventBtn = document.getElementById('event-btn');
const btnMsg = document.getElementById('btn-msg');
let pressTimer = null;

if(eventBtn) {
  eventBtn.addEventListener('click', () => {
    btnMsg.textContent = 'Button clicked! 🎉';
  });

  // Hover effect
  eventBtn.addEventListener('mouseenter', () => {
    btnMsg.textContent = 'Hovering over button!';
  });
  eventBtn.addEventListener('mouseleave', () => {
    btnMsg.textContent = '';
    clearTimeout(pressTimer);
  });

  // Keypress detection on page
  document.addEventListener('keydown', (e) => {
    btnMsg.textContent = `Key pressed: ${e.key}`;
    setTimeout(() => { btnMsg.textContent = ''; }, 1200);
  });

  // Bonus: Secret action (double-click or long-press)
  eventBtn.addEventListener('dblclick', () => {
    btnMsg.textContent = '🎊 Secret double-click action unlocked!';
  });
  eventBtn.addEventListener('mousedown', () => {
    pressTimer = setTimeout(() => {
      btnMsg.textContent = '🤫 Long press secret revealed!';
    }, 900);
  });
  eventBtn.addEventListener('mouseup', () => {
    clearTimeout(pressTimer);
  });
}

// --- Interactive: Image Gallery/Slideshow ---
const images = [
  'book1.jpg',
  'book2.jpg',
  'book3.jpg',
  // You can add more images here if you want
];
let imgIdx = 0;
const galleryImg = document.getElementById('gallery-img');
const prevBtn = document.getElementById('prev-img');
const nextBtn = document.getElementById('next-img');

function updateGalleryImg() {
  if(galleryImg) {
    galleryImg.src = images[imgIdx];
    galleryImg.classList.remove('animate');
    setTimeout(() => {
      galleryImg.classList.add('animate');
    }, 10);
  }
}
if(prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => {
    imgIdx = (imgIdx - 1 + images.length) % images.length;
    updateGalleryImg();
  });
  nextBtn.addEventListener('click', () => {
    imgIdx = (imgIdx + 1) % images.length;
    updateGalleryImg();
  });
}

// --- Tabs/Accordion ---
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    tabContents.forEach(tc => tc.style.display = 'none');
    document.getElementById(btn.dataset.tab).style.display = 'block';
  });
});

// --- View Project Button: hover and click effects ---
const projectBtn = document.querySelector('.project-btn');
if (projectBtn) {
  projectBtn.addEventListener('click', function(e) {
    // Visual feedback on click
    projectBtn.classList.add('clicked');
    const originalText = projectBtn.textContent;
    projectBtn.textContent = 'Opening...';
    setTimeout(() => {
      projectBtn.textContent = 'View Project';
      projectBtn.classList.remove('clicked');
    }, 1200);
    // Allow default link behavior (open in new tab)
  });
}

// --- Form Validation ---
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const messageInput = document.getElementById('message');
const formMsg = document.getElementById('form-msg');
const sendBtn = document.getElementById('send-btn');

const nameFeedback = document.getElementById('name-feedback');
const emailFeedback = document.getElementById('email-feedback');
const passwordFeedback = document.getElementById('password-feedback');
const messageFeedback = document.getElementById('message-feedback');

// --- Validation functions ---
function validateName() {
  if (!nameInput.value.trim()) {
    nameFeedback.textContent = 'Name is required';
    nameFeedback.className = 'feedback invalid';
    return false;
  }
  nameFeedback.textContent = 'Looks good!';
  nameFeedback.className = 'feedback valid';
  return true;
}
function validateEmail() {
  const val = emailInput.value.trim();
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!val) {
    emailFeedback.textContent = 'Email is required';
    emailFeedback.className = 'feedback invalid';
    return false;
  }
  if (!re.test(val)) {
    emailFeedback.textContent = 'Invalid email format';
    emailFeedback.className = 'feedback invalid';
    return false;
  }
  emailFeedback.textContent = 'Valid email!';
  emailFeedback.className = 'feedback valid';
  return true;
}
function validatePassword() {
  const val = passwordInput.value;
  if (!val) {
    passwordFeedback.textContent = 'Password is required';
    passwordFeedback.className = 'feedback invalid';
    return false;
  }
  if (val.length < 8) {
    passwordFeedback.textContent = 'Password must be at least 8 characters';
    passwordFeedback.className = 'feedback invalid';
    return false;
  }
  passwordFeedback.textContent = 'Strong password!';
  passwordFeedback.className = 'feedback valid';
  return true;
}
function validateMessage() {
  if (!messageInput.value.trim()) {
    messageFeedback.textContent = 'Message is required';
    messageFeedback.className = 'feedback invalid';
    return false;
  }
  messageFeedback.textContent = '';
  messageFeedback.className = 'feedback valid';
  return true;
}

// Real-time validation
if(nameInput && emailInput && passwordInput && messageInput) {
  nameInput.addEventListener('input', validateName);
  emailInput.addEventListener('input', validateEmail);
  passwordInput.addEventListener('input', validatePassword);
  messageInput.addEventListener('input', validateMessage);
}

if(contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const validName = validateName();
    const validEmail = validateEmail();
    const validPassword = validatePassword();
    const validMsg = validateMessage();
    if (validName && validEmail && validPassword && validMsg) {
      formMsg.textContent = 'Form submitted successfully! 🎉';
      formMsg.style.color = 'green';
      sendBtn.textContent = 'Sent!';
      setTimeout(() => {
        sendBtn.textContent = 'Send';
      }, 1200);
      contactForm.reset();
      // Remove feedback after submit
      [nameFeedback, emailFeedback, passwordFeedback, messageFeedback].forEach(fb => fb.textContent = '');
    } else {
      formMsg.textContent = 'Please fix errors above to submit.';
      formMsg.style.color = '#e74c3c';
      sendBtn.textContent = 'Send';
    }
  });
}