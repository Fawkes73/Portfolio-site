// Mobile navigation toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("show");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

// Close menu when a link is clicked (mobile)
navLinks.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    navLinks.classList.remove("show");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("click", (event) => {
  if (
    navLinks.classList.contains("show") &&
    !navLinks.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    navLinks.classList.remove("show");
    menuToggle.setAttribute("aria-expanded", "false");
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

// Hero mouse tracer effect
const hero = document.querySelector(".hero");
const heroTracer = document.querySelector(".hero-tracer");

hero.addEventListener("mousemove", (event) => {
  const rect = hero.getBoundingClientRect();
  heroTracer.style.left = `${event.clientX - rect.left}px`;
  heroTracer.style.top = `${event.clientY - rect.top}px`;
});

hero.addEventListener("mouseleave", () => {
  heroTracer.style.opacity = "0";
});

// Project showcase data and controls
const projectData = [
  {
    title: "No Man's Land",
    description:
      "A third-person survival game where you race against time, craft tools, and decode alien ruins to return home.",
    tech: "C# (Unity)",
  },
  {
    title: "Echoes of Auria",
    description:
      "A moody exploration adventure with puzzle relics, adaptive audio, and handcrafted environments.",
    tech: "Unity • Narrative Design",
  },
  {
    title: "Starforge Outpost",
    description:
      "A base-building prototype featuring modular crafting, drone logistics, and co-op mission loops.",
    tech: "Unity • Systems Design",
  },
];

const projectTitle = document.querySelector("#project-title");
const projectDescription = document.querySelector("#project-description");
const projectTech = document.querySelector("#project-tech");
const projectItems = document.querySelectorAll(".project-item");
const projectDots = document.querySelectorAll(".dot");
const projectNavButtons = document.querySelectorAll(".project-nav");

let activeProjectIndex = 0;

const updateProjectHighlight = (index) => {
  const data = projectData[index];
  if (!data) {
    return;
  }

  projectTitle.textContent = data.title;
  projectDescription.textContent = data.description;
  projectTech.textContent = data.tech;

  projectItems.forEach((item) => {
    item.classList.toggle(
      "is-active",
      Number(item.dataset.index) === index
    );
  });

  projectDots.forEach((dot) => {
    dot.classList.toggle("active", Number(dot.dataset.index) === index);
  });

  activeProjectIndex = index;
};

projectItems.forEach((item) => {
  item.addEventListener("click", () => {
    updateProjectHighlight(Number(item.dataset.index));
  });
});

projectDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    updateProjectHighlight(Number(dot.dataset.index));
  });
});

projectNavButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const direction = button.dataset.direction;
    const delta = direction === "next" ? 1 : -1;
    const nextIndex =
      (activeProjectIndex + delta + projectData.length) % projectData.length;
    updateProjectHighlight(nextIndex);
  });
});

updateProjectHighlight(activeProjectIndex);

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
