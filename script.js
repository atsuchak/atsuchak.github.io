// DOM elements
const header = document.getElementById("header");
const hamburger = document.querySelector(".hamburger");
const mobileNav = document.querySelector(".mobile-nav");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
const scrollTopBtn = document.getElementById("scroll-top-btn");
const contactForm = document.getElementById("contact-form");
const successModal = document.getElementById("success-modal");
const closeModal = document.querySelector(".close-modal");
const currentYearSpan = document.getElementById("current-year");

// Set current year in footer
if (currentYearSpan) {
  currentYearSpan.textContent = new Date().getFullYear();
}

// Header scroll effect
let lastScrollTop = 0;

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Add/remove scrolled class
  if (scrollTop > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Hide/show header on scroll direction
  if (scrollTop > lastScrollTop && scrollTop > 300) {
    // Scrolling down
    header.classList.add("hide");
  } else {
    // Scrolling up
    header.classList.remove("hide");
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

  // Show/hide scroll to top button
  if (scrollTop > 500) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});

// // Mobile menu toggle
if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileNav.classList.toggle("open");
    document.body.classList.toggle("no-scroll");
  });
}

// Close mobile menu when clicking on a mobile menu link
if (mobileNavLinks.length > 0) {
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      mobileNav.classList.remove("open");
      document.body.classList.remove("no-scroll");
    });
  });
}

// Scroll to top functionality
if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Form validation
const validateForm = () => {
  let isValid = true;
  const name = document.getElementById("name");
  const nameError = document.getElementById("name-error");
  const email = document.getElementById("email");
  const emailError = document.getElementById("email-error");
  const subject = document.getElementById("subject");
  const subjectError = document.getElementById("subject-error");
  const message = document.getElementById("message");
  const messageError = document.getElementById("message-error");

  // Reset errors
  nameError.textContent = "";
  emailError.textContent = "";
  subjectError.textContent = "";
  messageError.textContent = "";

  // Validate name
  if (name.value.trim().length < 2) {
    nameError.textContent = "Name must be at least 2 characters.";
    isValid = false;
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    emailError.textContent = "Please enter a valid email address.";
    isValid = false;
  }

  // Validate subject
  if (subject.value.trim().length < 5) {
    subjectError.textContent = "Subject must be at least 5 characters.";
    isValid = false;
  }

  // Validate message
  if (message.value.trim().length < 10) {
    messageError.textContent = "Message must be at least 10 characters.";
    isValid = false;
  }

  return isValid;
};

// Handle form submission
if (contactForm) {
  contactForm.action = "https://formspree.io/f/xanolyyq"; // Replace with your Formspree ID
  contactForm.method = "POST";

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (validateForm()) {
      const submitBtn = document.getElementById("submit-btn");
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      // Form data to send
      const formData = new FormData(contactForm);

      // Send form data to Formspree
      fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            // Show success modal
            successModal.classList.add("show");
            // Reset form
            contactForm.reset();
          } else {
            throw new Error("Form submission failed");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert(
            "Sorry, there was a problem sending your message. Please try again later."
          );
        })
        .finally(() => {
          // Reset button
          submitBtn.textContent = "Send Message";
          submitBtn.disabled = false;
        });
    }
  });
}

// Close modal
if (closeModal) {
  closeModal.addEventListener("click", () => {
    successModal.classList.remove("show");
  });
}

// Close modal when clicking outside
if (successModal) {
  window.addEventListener("click", (e) => {
    if (e.target === successModal) {
      successModal.classList.remove("show");
    }
  });
}

// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = document.getElementById("header")?.offsetHeight || 0;
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Add animations to elements when they enter the viewport
const animateOnScroll = () => {
  const elements = document.querySelectorAll(
    ".skill-card, .project-card, .section-heading, .about-image-container"
  );

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementPosition < windowHeight - 100) {
      element.classList.add("fadeIn");
    }
  });
};

// Run animation check on scroll
window.addEventListener("scroll", animateOnScroll);

// Run animation check on page load
window.addEventListener("load", () => {
  animateOnScroll();
});
