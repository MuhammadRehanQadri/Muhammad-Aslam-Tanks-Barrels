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

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const form = e.target;
        const data = new FormData(form);
        const action = form.action;
        
        // Get button to show loading state
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerText;
        
        // Show loading state
        btn.innerText = 'Sending...';
        btn.disabled = true;
        btn.style.opacity = '0.7';

        fetch(action, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                // Success State
                btn.innerText = 'Message Sent!';
                btn.style.backgroundColor = '#10b981'; // Success Green
                
                // Clear form
                form.reset();
                
                // User feedback
                alert("Thank you! your message has been sent successfully.");
            } else {
                // Error State
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        alert(data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        alert("Oops! There was a problem submitting your form");
                    }
                });
                btn.innerText = 'Error';
                btn.style.backgroundColor = '#ef4444'; 
            }
        }).catch(error => {
            alert("Oops! There was a problem submitting your form");
            btn.innerText = 'Error';
            btn.style.backgroundColor = '#ef4444'; 
        }).finally(() => {
            // Reset button state after delay
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.backgroundColor = '';
                btn.disabled = false;
                btn.style.opacity = '1';
            }, 3000);
        });
    });
}
