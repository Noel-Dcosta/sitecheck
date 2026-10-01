document.documentElement.classList.add("js");

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  note.textContent = "Thanks — your walkthrough request has been captured in this demo.";
  note.style.color = "#3A8B5C";
  form.querySelector("button").innerHTML = "Request received ✓";
});

// Hero product visual carousel: Daily photos → AI flags → Visual timeline
const visualSlides = document.querySelectorAll('.visual-slide');
const visualDots = document.querySelectorAll('.visual-dot');
let visualIndex = 0;
let visualTimer;

function showVisual(index) {
  visualIndex = index;
  visualSlides.forEach((slide, i) => slide.classList.toggle('active', i === index));
  visualDots.forEach((dot, i) => dot.classList.toggle('active', i === index));
}

function startVisualTimer() {
  clearInterval(visualTimer);
  visualTimer = setInterval(() => {
    showVisual((visualIndex + 1) % visualSlides.length);
  }, 4200);
}

visualDots.forEach((dot) => {
  dot.addEventListener('click', () => {
    showVisual(Number(dot.dataset.go));
    startVisualTimer();
  });
});

if (visualSlides.length) startVisualTimer();
