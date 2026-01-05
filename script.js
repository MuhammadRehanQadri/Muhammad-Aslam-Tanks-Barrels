// Mobile Menu Toggle
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-links li");

burger.addEventListener("click", () => {
  // Toggle Nav
  nav.classList.toggle("nav-active");

  // Burger Animation
  burger.classList.toggle("toggle");
});

// Close menu when link is clicked
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("nav-active");
    burger.classList.remove("toggle");
  });
});

// Scroll Reveal Animation
window.addEventListener("scroll", reveal);

function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowheight = window.innerHeight;
    var revealtop = reveals[i].getBoundingClientRect().top;
    var revealpoint = 150;

    if (revealtop < windowheight - revealpoint) {
      reveals[i].classList.add("active");
    } else {
      // Optional: remove class to replay animation when scrolling up
      // reveals[i].classList.remove('active');
    }
  }
}

// Trigger reveal on load for elements already in view
reveal();

// Smooth scrolling for anchor links (polyfill support not strictly needed for modern browsers but good practice)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
