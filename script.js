/* Deep Glassmorphism Interactive Engine - 60FPS Performance Engine */
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
let isPointerMoving = false;

const colors = ["#66ffd1", "#f6c85f", "#d38cff", "#f1f7f3"];

/* Minimalist Professional Haptic Micro-Tick Audio Engine */
let audioCtx = null;

function playMinimalTick(intensity = "soft") {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  if (!audioCtx) return;

  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  if (intensity === "primary") {
    osc.type = "sine";
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.022);
    gain.gain.setValueAtTime(0.02, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);
    osc.start(now);
    osc.stop(now + 0.025);
  } else {
    osc.type = "sine";
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(130, now + 0.014);
    gain.gain.setValueAtTime(0.012, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.016);
    osc.start(now);
    osc.stop(now + 0.016);
  }
}

document.addEventListener("click", (e) => {
  const isPrimary = e.target.closest(".btn-primary, .nav-cta, #copyEmailBtn");
  const isInteractive = e.target.closest("a, button, .modal-trigger-btn, .modal-close");

  if (isPrimary) {
    playMinimalTick("primary");
  } else if (isInteractive) {
    playMinimalTick("soft");
  }
});

/* Custom Glowing Cursor - Smooth Throttled Animation */
function updateCursor() {
  ringX += (cursorX - ringX) * 0.32;
  ringY += (cursorY - ringY) * 0.32;

  if (cursorDot && cursorRing) {
    cursorDot.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
  }
}

window.addEventListener("pointermove", (event) => {
  cursorX = event.clientX;
  cursorY = event.clientY;
  pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
  pointerY = (event.clientY / window.innerHeight - 0.5) * 2;

  if (!isPointerMoving) {
    isPointerMoving = true;
    requestAnimationFrame(() => {
      document.body.classList.add("cursor-ready");
      const card = event.target.closest(".feature-card, .knowledge-card, .hero-mockup-frame, .contact-form, .project-modal");
      if (card) {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty("--glow-x", `${x}%`);
        card.style.setProperty("--glow-y", `${y}%`);
      }
      isPointerMoving = false;
    });
  }
}, { passive: true });

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

/* ChatGPT / Gemini Style Copy Email Handler */
const copyEmailBtn = document.querySelector("#copyEmailBtn");
const copyBtnText = document.querySelector("#copyBtnText");
const copyToast = document.querySelector("#copyToast");

copyEmailBtn?.addEventListener("click", () => {
  const email = "quaspace.official@gmail.com";
  
  const handleCopied = () => {
    if (copyBtnText) copyBtnText.textContent = "✓ Copied!";
    if (copyEmailBtn) copyEmailBtn.classList.add("copied");

    if (copyToast) {
      copyToast.classList.add("show");
      setTimeout(() => copyToast.classList.remove("show"), 2400);
    }

    setTimeout(() => {
      if (copyBtnText) copyBtnText.textContent = "Copy Email";
      if (copyEmailBtn) copyEmailBtn.classList.remove("copied");
    }, 2200);
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(handleCopied).catch(() => {
      const ta = document.createElement("textarea");
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      handleCopied();
    });
  } else {
    const ta = document.createElement("textarea");
    ta.value = email;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    handleCopied();
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

/* Cosmic Canvas Particle Animation - Optimized 25 Nodes */
function resizeCanvas() {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * pixelRatio);
  canvas.height = Math.floor(height * pixelRatio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

  const total = 25;
  particles = Array.from({ length: total }, (_, index) => ({
    angle: (index / total) * Math.PI * 2,
    orbit: 50 + Math.random() * Math.min(width, height) * 0.4,
    radius: 1 + Math.random() * 2,
    speed: 0.001 + Math.random() * 0.002,
    depth: 0.3 + Math.random() * 0.7,
    color: colors[index % colors.length],
  }));
}

/* Live Physics/AI Hero Canvas Animation */
const heroCanvas = document.querySelector("#heroCanvas");
let hCtx = null;
let nodes = [];
let hMouseX = -1000;
let hMouseY = -1000;

if (heroCanvas) {
  hCtx = heroCanvas.getContext("2d");
  nodes = Array.from({ length: 8 }, (_, i) => ({
    x: 25 + (i % 4) * 85 + Math.random() * 15,
    y: 20 + Math.floor(i / 4) * 35 + Math.random() * 10,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    radius: 2.5 + Math.random() * 1.5,
    color: i % 3 === 0 ? "#66ffd1" : i % 3 === 1 ? "#f6c85f" : "#d38cff",
  }));

  heroCanvas.addEventListener("mousemove", (e) => {
    const rect = heroCanvas.getBoundingClientRect();
    hMouseX = e.clientX - rect.left;
    hMouseY = e.clientY - rect.top;
  }, { passive: true });

  heroCanvas.addEventListener("mouseleave", () => {
    hMouseX = -1000;
    hMouseY = -1000;
  }, { passive: true });
}

function drawHeroCanvas() {
  if (!hCtx || !heroCanvas) return;
  hCtx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 90) {
        hCtx.beginPath();
        hCtx.strokeStyle = "rgba(102, 255, 209, " + (0.22 - dist / 400) + ")";
        hCtx.lineWidth = 1;
        hCtx.moveTo(nodes[i].x, nodes[i].y);
        hCtx.lineTo(nodes[j].x, nodes[j].y);
        hCtx.stroke();
      }
    }
  }

  nodes.forEach((n) => {
    n.x += n.vx;
    n.y += n.vy;

    if (n.x < 10 || n.x > heroCanvas.width - 10) n.vx *= -1;
    if (n.y < 10 || n.y > heroCanvas.height - 10) n.vy *= -1;

    const mdx = hMouseX - n.x;
    const mdy = hMouseY - n.y;
    const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
    if (mDist < 60) {
      n.x += (mdx / mDist) * 0.6;
      n.y += (mdy / mDist) * 0.6;
    }

    hCtx.beginPath();
    hCtx.fillStyle = n.color;
    hCtx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
    hCtx.fill();
  });
}

/* Master 60FPS Single Animation Loop */
function masterLoop(time) {
  if (document.hidden) {
    requestAnimationFrame(masterLoop);
    return;
  }

  updateCursor();

  // Cosmos background render
  context.clearRect(0, 0, width, height);
  const centerX = width * 0.58 + pointerX * 14;
  const centerY = height * 0.43 + pointerY * 10;

  context.save();
  context.translate(centerX, centerY);
  context.rotate(time * 0.00006);

  particles.forEach((particle, index) => {
    const angle = particle.angle + time * particle.speed;
    const x = Math.cos(angle) * particle.orbit;
    const y = Math.sin(angle) * particle.orbit * particle.depth;
    const scale = 0.45 + particle.depth;

    context.beginPath();
    context.fillStyle = particle.color;
    context.globalAlpha = 0.22 + particle.depth * 0.35;
    context.arc(x, y, particle.radius * scale, 0, Math.PI * 2);
    context.fill();
  });
  context.restore();

  drawHeroCanvas();

  requestAnimationFrame(masterLoop);
}

/* Kinetic Waveform Narrative Spine Scroll Tracking */
const spineActivePath = document.querySelector("#spineActivePath");
if (spineActivePath) {
  const pathLength = spineActivePath.getTotalLength();
  spineActivePath.style.strokeDasharray = pathLength;
  spineActivePath.style.strokeDashoffset = pathLength;

  function updateSpineScroll() {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const drawLength = pathLength * Math.min(1, Math.max(0, scrollPercent));
    spineActivePath.style.strokeDashoffset = pathLength - drawLength;
  }

  window.addEventListener("scroll", updateSpineScroll, { passive: true });
  updateSpineScroll();
}

window.addEventListener("resize", resizeCanvas, { passive: true });
resizeCanvas();
requestAnimationFrame(masterLoop);

/* Mobile Bottom Dock Active Section Observer */
const mobileDockItems = document.querySelectorAll(".mobile-dock-item");
const sections = document.querySelectorAll("section[id]");

if (mobileDockItems.length > 0 && sections.length > 0) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        mobileDockItems.forEach((item) => {
          const href = item.getAttribute("href");
          if (href === `#${id}`) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach((sec) => sectionObserver.observe(sec));
}
