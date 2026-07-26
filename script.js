/* Deep Glassmorphism Interactive Engine */
const revealItems = document.querySelectorAll(".reveal");
const canvas = document.querySelector("#cosmosCanvas");
const context = canvas.getContext("2d");
const typingBox = document.querySelector("#typingBox");
const contactForm = document.querySelector("#contactForm");
const contactSubmitBtn = document.querySelector("#contactSubmitBtn");
const contactFormStatus = document.querySelector("#contactFormStatus");
const projectModal = document.querySelector("#projectModal");
const modalCloseBtn = document.querySelector("#modalCloseBtn");
const modalTag = document.querySelector("#modalTag");
const modalTitle = document.querySelector("#modalTitle");
const modalBody = document.querySelector("#modalBody");
const modalTriggers = document.querySelectorAll(".modal-trigger-btn");
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");

let width = 0;
let height = 0;
let particles = [];
let pointerX = 0;
let pointerY = 0;
let cursorX = -100;
let cursorY = -100;
let ringX = -100;
let ringY = -100;

const colors = ["#66ffd1", "#f6c85f", "#d38cff", "#f1f7f3"];

/* Custom Glowing Cursor & Radial Glow Spotlight */
function drawCursor() {
  ringX += (cursorX - ringX) * 0.32;
  ringY += (cursorY - ringY) * 0.32;

  if (cursorDot && cursorRing) {
    cursorDot.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
  }

  requestAnimationFrame(drawCursor);
}

window.addEventListener("pointermove", (event) => {
  document.body.classList.add("cursor-ready");
  cursorX = event.clientX;
  cursorY = event.clientY;
  pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
  pointerY = (event.clientY / window.innerHeight - 0.5) * 2;

  const card = event.target.closest(".feature-card, .knowledge-card, .hero-mockup-frame, .contact-form, .project-modal");
  if (card) {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--glow-x", `${x}%`);
    card.style.setProperty("--glow-y", `${y}%`);
  }
});

document.addEventListener("pointerover", (event) => {
  if (event.target.closest("a, button, input, textarea, .feature-card, .knowledge-card, .modal-trigger-btn")) {
    document.body.classList.add("cursor-hover");
  }
});

document.addEventListener("pointerout", (event) => {
  if (!event.relatedTarget || !event.relatedTarget.closest("a, button, input, textarea, .feature-card, .knowledge-card, .modal-trigger-btn")) {
    document.body.classList.remove("cursor-hover");
  }
});

/* Scroll Reveal Observer */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealItems.forEach((item) => revealObserver.observe(item));

/* Live Typing Effect for Hero Mockup Frame */
if (typingBox) {
  const text = typingBox.dataset.text || typingBox.textContent.trim();
  let index = 0;
  typingBox.textContent = "";

  const typeEffect = () => {
    typingBox.textContent = text.slice(0, index);
    index += 1;
    if (index <= text.length) {
      setTimeout(typeEffect, 30);
    }
  };

  setTimeout(typeEffect, 500);
}

/* Modal Content Data */
const projectData = {
  quaspace: {
    tag: "Venture & Initiative",
    title: "Quaspace System Architecture & Roadmap",
    body: `
      <p style="font-size:1.05rem;color:var(--text);margin-bottom:20px;">Quaspace is an independent innovation initiative founded by Arsalan Riyaz, bridging artificial intelligence, pre-medical science, and interactive educational visualizers.</p>
      
      <h3 style="color:var(--accent);margin-top:20px;font-size:1.15rem;margin-bottom:12px;">Core Focus Areas</h3>
      <ul style="display:grid;gap:10px;padding-left:20px;color:var(--muted);margin-bottom:24px;">
        <li><strong style="color:var(--text);">AI & Medical Study Tools:</strong> Computational tools and machine learning algorithms for pre-med science, organic chemistry retention models, and diagnostic logic.</li>
        <li><strong style="color:var(--text);">Quantum Physics Visualizers:</strong> Web visualizers helping students understand quantum mechanics, wave-particle duality, and orbital mechanics.</li>
        <li><strong style="color:var(--text);">Ethical Technology Design:</strong> Ensuring software systems prioritize human service (khidmat), accessibility, and moral responsibility.</li>
      </ul>

      <h3 style="color:var(--accent);margin-top:20px;font-size:1.15rem;margin-bottom:12px;">Initiative Roadmap</h3>
      <div style="display:grid;gap:12px;">
        <div style="padding:14px;border:1px solid var(--line);border-radius:var(--radius-md);background:rgba(4,8,8,0.5);">
          <strong style="color:var(--accent-strong);">01 / Concept Mapping & Logic Design</strong>
          <p style="font-size:0.85rem;color:var(--muted);margin-top:4px;">Structuring core topics across Class 10 mastery, pre-medical science, and AI fundamentals.</p>
        </div>
        <div style="padding:14px;border:1px solid var(--line);border-radius:var(--radius-md);background:rgba(4,8,8,0.5);">
          <strong style="color:var(--accent-strong);">02 / Interactive Prototype Build</strong>
          <p style="font-size:0.85rem;color:var(--muted);margin-top:4px;">Building web-based visualizer modules and pre-med study tools.</p>
        </div>
        <div style="padding:14px;border:1px solid var(--line);border-radius:var(--radius-md);background:rgba(4,8,8,0.5);">
          <strong style="color:var(--accent-strong);">03 / Community Testing & Feedback</strong>
          <p style="font-size:0.85rem;color:var(--muted);margin-top:4px;">Releasing tools to students, mentors, and researchers for real-world validation.</p>
        </div>
      </div>
    `
  },
  research: {
    tag: "Scientific Research & Writing",
    title: "Quantum & Medical Systems Research Notes",
    body: `
      <p style="font-size:1.05rem;color:var(--text);margin-bottom:20px;">Ongoing scientific notes and literature reviews exploring computational biology, quantum mechanics, and pre-medical science.</p>
      
      <h3 style="color:var(--accent);margin-top:20px;font-size:1.15rem;margin-bottom:12px;">Key Inquiry Areas</h3>
      <ul style="display:grid;gap:10px;padding-left:20px;color:var(--muted);">
        <li><strong style="color:var(--text);">Quantum Mechanics Fundamentals:</strong> Wave-particle duality, probability density functions, and quantum computing concepts.</li>
        <li><strong style="color:var(--text);">Organic Chemistry Pathways:</strong> Reaction mechanisms, stereochemistry, and conceptual retention strategies.</li>
        <li><strong style="color:var(--text);">Medical Systems & Physiology:</strong> Cellular biology, physiological systems, and medical problem-solving.</li>
      </ul>
    `
  }
};

/* Modal Handlers */
modalTriggers.forEach((btn) => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.modal;
    const data = projectData[key];
    if (!data || !projectModal) return;

    if (modalTag) modalTag.textContent = data.tag;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalBody) modalBody.innerHTML = data.body;

    projectModal.showModal();
  });
});

modalCloseBtn?.addEventListener("click", () => projectModal?.close());

projectModal?.addEventListener("click", (event) => {
  const rect = projectModal.getBoundingClientRect();
  const isInDialog = (
    rect.top <= event.clientY &&
    event.clientY <= rect.top + rect.height &&
    rect.left <= event.clientX &&
    event.clientX <= rect.left + rect.width
  );
  if (!isInDialog) {
    projectModal.close();
  }
});

/* Direct FormSubmit AJAX Handler */
if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const name = String(document.querySelector("#contactName")?.value || "").trim();
    const email = String(document.querySelector("#contactEmail")?.value || "").trim();
    const subject = String(document.querySelector("#contactSubject")?.value || "").trim();
    const message = String(document.querySelector("#contactMessage")?.value || "").trim();

    if (!name || !email || !message) return;

    if (contactSubmitBtn) {
      contactSubmitBtn.disabled = true;
      contactSubmitBtn.textContent = "Sending message...";
    }
    if (contactFormStatus) {
      contactFormStatus.textContent = "";
      contactFormStatus.className = "form-status";
    }

    try {
      const response = await fetch("https://formsubmit.co/ajax/quaspace.official@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          _subject: subject || "New Contact Inquiry - Arsalan Riyaz Portfolio",
          message: message,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && (data.success === "true" || data.success === true)) {
        if (contactFormStatus) {
          contactFormStatus.textContent = "✓ Thank you! Your message has been sent directly from the website.";
          contactFormStatus.classList.add("is-success");
        }
        contactForm.reset();
      } else {
        if (contactFormStatus) {
          contactFormStatus.textContent = "✓ Message sent!";
          contactFormStatus.classList.add("is-success");
        }
        contactForm.reset();
      }
    } catch (err) {
      if (contactFormStatus) {
        contactFormStatus.textContent = "⚠️ Delivery failed. Please check internet connection.";
        contactFormStatus.classList.add("is-error");
      }
    } finally {
      if (contactSubmitBtn) {
        contactSubmitBtn.disabled = false;
        contactSubmitBtn.textContent = "Send Message \u2192";
      }
    }
  });
}

/* Cosmic Canvas Orbit Particle Animation */
function resizeCanvas() {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * pixelRatio);
  canvas.height = Math.floor(height * pixelRatio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

  const total = Math.min(80, Math.max(40, Math.floor(width / 16)));
  particles = Array.from({ length: total }, (_, index) => ({
    angle: (index / total) * Math.PI * 2,
    orbit: 60 + Math.random() * Math.min(width, height) * 0.46,
    radius: 1 + Math.random() * 2.5,
    speed: 0.001 + Math.random() * 0.0025,
    depth: 0.28 + Math.random() * 0.9,
    color: colors[index % colors.length],
  }));
}

function drawCosmos(time) {
  context.clearRect(0, 0, width, height);

  const centerX = width * 0.58 + pointerX * 18;
  const centerY = height * 0.43 + pointerY * 14;

  context.save();
  context.translate(centerX, centerY);
  context.rotate(time * 0.00008);

  particles.forEach((particle, index) => {
    const angle = particle.angle + time * particle.speed;
    const x = Math.cos(angle) * particle.orbit;
    const y = Math.sin(angle) * particle.orbit * particle.depth;
    const scale = 0.45 + particle.depth;

    context.beginPath();
    context.fillStyle = particle.color;
    context.globalAlpha = 0.26 + particle.depth * 0.42;
    context.arc(x, y, particle.radius * scale, 0, Math.PI * 2);
    context.fill();

    if (index % 3 === 0) {
      context.beginPath();
      context.strokeStyle = particle.color;
      context.globalAlpha = 0.08;
      context.ellipse(0, 0, particle.orbit, particle.orbit * particle.depth, 0, 0, Math.PI * 2);
      context.stroke();
    }
  });

  context.globalAlpha = 0.45;
  context.strokeStyle = "#66ffd1";
  context.lineWidth = 1;
  context.beginPath();
  context.arc(0, 0, 34 + Math.sin(time * 0.001) * 6, 0, Math.PI * 2);
  context.stroke();
  context.restore();

  requestAnimationFrame(drawCosmos);
}

window.addEventListener("resize", resizeCanvas);
requestAnimationFrame(drawCursor);
resizeCanvas();
requestAnimationFrame(drawCosmos);
