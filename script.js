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
