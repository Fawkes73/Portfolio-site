// Mobile navigation toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Close menu when a link is clicked (mobile)
navLinks.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    navLinks.classList.remove("show");
  }
});

// Scroll animation for sections
const revealElements = document.querySelectorAll(".section, .hero");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((element) => {
  element.classList.add("reveal");
  revealObserver.observe(element);
});

// Animated skill bars
const skillBars = document.querySelectorAll(".skill-bar");
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const level = entry.target.dataset.level;
        const fill = entry.target.querySelector(".skill-fill");
        fill.style.width = `${level}%`;
      }
    });
  },
  { threshold: 0.4 }
);

skillBars.forEach((bar) => {
  skillObserver.observe(bar);
});

// Basic form validation
const form = document.querySelector(".contact-form");
const successMessage = document.querySelector(".form-success");

const showError = (input, message) => {
  const row = input.parentElement;
  const error = row.querySelector(".error-message");
  error.textContent = message;
};

const clearError = (input) => {
  const row = input.parentElement;
  const error = row.querySelector(".error-message");
  error.textContent = "";
};

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let isFormValid = true;

  const nameInput = form.querySelector("#name");
  const emailInput = form.querySelector("#email");
  const messageInput = form.querySelector("#message");

  if (!nameInput.value.trim()) {
    showError(nameInput, "Please enter your full name.");
    isFormValid = false;
  } else {
    clearError(nameInput);
  }

  if (!emailInput.value.trim()) {
    showError(emailInput, "Please enter your email address.");
    isFormValid = false;
  } else if (!isValidEmail(emailInput.value)) {
    showError(emailInput, "Please enter a valid email.");
    isFormValid = false;
  } else {
    clearError(emailInput);
  }

  if (!messageInput.value.trim()) {
    showError(messageInput, "Please share a short message.");
    isFormValid = false;
  } else {
    clearError(messageInput);
  }

  if (isFormValid) {
    successMessage.textContent =
      "Thanks for reaching out! I'll respond within 48 hours.";
    form.reset();
  } else {
    successMessage.textContent = "";
  }
});
