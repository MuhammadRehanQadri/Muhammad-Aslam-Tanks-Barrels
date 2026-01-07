const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-links li");

if (burger && nav) {
  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");
    burger.classList.toggle("toggle");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("nav-active");
      burger.classList.remove("toggle");
    });
  });
}

const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach((el) => revealObserver.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-visible"));
}

// Smooth scrolling for in-page anchors
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Contact Form Handling
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    let action = form.action;
    if (!action || action === window.location.href) {
      action = "https://formspree.io/f/mqeanodd";
    }

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerText;

    btn.innerText = "Sending...";
    btn.disabled = true;
    btn.style.opacity = "0.7";

    fetch(action, {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          btn.innerText = "Message Sent!";
          btn.style.backgroundColor = "#10b981";
          form.reset();
          alert("Thank you! Your message has been sent successfully.");
        } else {
          response.json().then((data) => {
            if (Object.hasOwn(data, "errors")) {
              alert(data["errors"].map((error) => error["message"]).join(", "));
            } else {
              alert("Oops! There was a problem submitting your form");
            }
          });
          btn.innerText = "Error";
          btn.style.backgroundColor = "#ef4444";
        }
      })
      .catch(() => {
        alert("Oops! There was a problem submitting your form");
        btn.innerText = "Error";
        btn.style.backgroundColor = "#ef4444";
      })
      .finally(() => {
        setTimeout(() => {
          btn.innerText = originalText;
          btn.style.backgroundColor = "";
          btn.disabled = false;
          btn.style.opacity = "1";
        }, 3000);
      });
  });
}

const yearEl = document.getElementById("current-year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
