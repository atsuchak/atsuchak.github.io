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



const themeToggle = document.getElementById("theme-toggle");
const sunIcon = document.getElementById("sun-icon");
const moonIcon = document.getElementById("moon-icon");
const body = document.body;

// Check for saved user preference (default to light mode)
// const savedTheme = localStorage.getItem("theme");
// if (savedTheme === "dark") {
//     body.classList.add("dark-mode");
//     moonIcon.style.display = "inline-block";
//     sunIcon.style.display = "none";
// }

themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Update icon visibility
    const isDark = body.classList.contains("dark-mode");
    sunIcon.style.display = isDark ? "none" : "inline-block";
    moonIcon.style.display = isDark ? "inline-block" : "none";

    // Save preference
    localStorage.setItem("theme", isDark ? "dark" : "light");
});
