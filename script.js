const navToggle = document.getElementById("nav-toggle");
const nav = document.querySelector(".nav-links");
const header = document.getElementById("header");

if (navToggle && nav) {
  const setOpen = (open) => {
    nav.classList.toggle("nav-active", open);
    navToggle.classList.toggle("toggle", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  navToggle.addEventListener("click", () => {
    const open = !nav.classList.contains("nav-active");
    setOpen(open);
    if (open) {
      const first = nav.querySelector("a");
      if (first) first.focus();
    }
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("nav-active")) {
      setOpen(false);
      navToggle.focus();
    }
  });
}

const setHeaderState = () => {
  if (!header) {
    return;
  }
  header.classList.toggle("scrolled", window.scrollY > 20);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

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

// Contact Form Handling
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  const status = document.getElementById("form-status");
  const say = (msg, ok) => {
    if (!status) return;
    status.textContent = msg;
    status.className = "form-status " + (ok ? "ok" : "err");
  };

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

    say("", true);
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
          btn.innerText = "Request Sent";
          btn.style.backgroundColor = "#10b981";
          form.reset();
          say(
            "Thank you — your request has been sent. We reply within one working day. For a faster response, message us on WhatsApp.",
            true
          );
          return;
        }
        btn.innerText = "Error";
        btn.style.backgroundColor = "#ef4444";
        return response
          .json()
          .then((body) => {
            if (body && body.errors) {
              say(body.errors.map((err) => err.message).join(", "), false);
            } else {
              say(
                "Sorry — there was a problem sending your request. Please call or WhatsApp us on +971 52 256 0462.",
                false
              );
            }
          })
          .catch(() => {
            say(
              "Sorry — there was a problem sending your request. Please call or WhatsApp us on +971 52 256 0462.",
              false
            );
          });
      })
      .catch(() => {
        btn.innerText = "Error";
        btn.style.backgroundColor = "#ef4444";
        say(
          "Sorry — there was a problem sending your request. Please call or WhatsApp us on +971 52 256 0462.",
          false
        );
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
