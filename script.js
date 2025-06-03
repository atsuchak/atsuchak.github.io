document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navIcons = document.querySelectorAll(".nav-list li i");

  function updateActiveIcon() {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navIcons.forEach((icon) => {
      icon.classList.remove("active");
      const parentLink = icon.closest("a");
      if (parentLink && parentLink.getAttribute("href") === "#" + current) {
        icon.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveIcon);
  updateActiveIcon();
});

//themesaved
const themeToggle = document.getElementById("theme-toggle");
const sunIcon = document.getElementById("sun-icon");
const moonIcon = document.getElementById("moon-icon");
const body = document.body;
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark-mode");
  moonIcon.style.display = "inline-block";
  sunIcon.style.display = "none";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  const isDark = body.classList.contains("dark-mode");
  sunIcon.style.display = isDark ? "none" : "inline-block";
  moonIcon.style.display = isDark ? "inline-block" : "none";

  localStorage.setItem("theme", isDark ? "dark" : "light");
});

//form reset
const messageForm = document.querySelector(".message-form");

messageForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(messageForm);
  const submitButton = messageForm.querySelector("button");
  const originalButtonText = submitButton.textContent;

  try {
    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    const response = await fetch("https://formspree.io/f/manorzew", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      alert("Message sent successfully! I'll get back to you soon.");
      messageForm.reset();
    } else {
      throw new Error("Form submission failed");
    }
  } catch (error) {
    alert("Oops! Something went wrong. Please try again later.");
    console.error("Form submission error:", error);
  } finally {
    submitButton.textContent = originalButtonText;
    submitButton.disabled = false;
  }
});
