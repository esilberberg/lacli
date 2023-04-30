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
  