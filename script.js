const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-links a");
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  document.body.classList.toggle("menu-open");
});

navItems.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    document.body.classList.remove("menu-open");
  });
});

const sections = document.querySelectorAll("section[id]");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navItems.forEach(item => {
      item.classList.toggle(
        "active",
        item.getAttribute("href") === "#" + entry.target.id
      );
    });
  });
}, { threshold: 0.45 });

sections.forEach(section => observer.observe(section));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  formNote.textContent = `Thanks ${name}! Your message is ready to be connected to your email/backend.`;
  form.reset();
});

const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalClose = document.getElementById("modalClose");

document.querySelectorAll(".project-link").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const project = link.dataset.demo;
    modalTitle.textContent = project;
    modalText.textContent =
      `${project} is listed in this portfolio. Replace this button with the real GitHub repository, live demo or project page URL.`;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  });
});

function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});















/* =========================================================
   THEME COLOR SWITCHER
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const themeToggle = document.getElementById("themeToggle");
    const themePanel = document.getElementById("themePanel");
    const themeButtons = document.querySelectorAll(".theme-btn");


    /* ---------------------------------------------
       Safety Check
    --------------------------------------------- */

    if (!themeToggle || !themePanel) {
        console.error("Theme switcher elements not found.");
        return;
    }


    /* ---------------------------------------------
       Load Saved Theme
    --------------------------------------------- */

    const savedTheme =
        localStorage.getItem("portfolioTheme");

    if (savedTheme) {

        document.documentElement.setAttribute(
            "data-theme",
            savedTheme
        );

    } else {

        document.documentElement.setAttribute(
            "data-theme",
            "green"
        );

    }


    /* ---------------------------------------------
       Open / Close Theme Panel
    --------------------------------------------- */

    themeToggle.addEventListener("click", function (event) {

        event.stopPropagation();

        themePanel.classList.toggle("active");

    });


    /* ---------------------------------------------
       Select Theme
    --------------------------------------------- */

    themeButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.stopPropagation();

            const selectedTheme =
                button.getAttribute("data-theme");


            /* Apply theme */

            document.documentElement.setAttribute(
                "data-theme",
                selectedTheme
            );


            /* Save theme */

            localStorage.setItem(
                "portfolioTheme",
                selectedTheme
            );


            /* Close panel */

            themePanel.classList.remove("active");

        });

    });


    /* ---------------------------------------------
       Close Panel When Clicking Outside
    --------------------------------------------- */

    document.addEventListener("click", function (event) {

        if (
            !themePanel.contains(event.target) &&
            !themeToggle.contains(event.target)
        ) {

            themePanel.classList.remove("active");

        }

    });

});
