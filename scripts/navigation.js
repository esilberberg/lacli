//Mobile responsive hamburger nav menu
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active-hamburger");
    navMenu.classList.toggle("active-hamburger");
    if (navMenu.classList.contains("active-hamburger")) {
        document.body.style.overflowY = "hidden";
    } else {
        document.body.style.overflowY = "auto";
    }
});

document.querySelectorAll(".nav-link").forEach((n) =>
    n.addEventListener("click", () => {
        hamburger.classList.remove("active-hamburger");
        navMenu.classList.remove("active-hamburger");
        document.body.style.overflowY = "auto";
    })
);

// Return to top button on library.html
const topButton = document.getElementById('topButton');

if (topButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            topButton.style.display = 'block';
        } else {
            topButton.style.display = 'none';
        }
    });

    topButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// About page contributors accordion
const collaboratorsHeading = document.getElementById('collaborators-heading');
const collaboratorsAccordion = document.getElementById('collaborators-accordion');

if (collaboratorsHeading && collaboratorsAccordion) {
    collaboratorsHeading.addEventListener('click', function() {
        collaboratorsAccordion.classList.toggle('collaborators-accordion-active');
    });
}

// HELP page accordion
var acc = document.getElementsByClassName("help-accordion-btn");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("help-accordion-active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}