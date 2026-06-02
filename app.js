(() => {
  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function initSiteConfig() {
    const cfg = window.LEX_SITE;
    if (!cfg || typeof cfg !== "object") return;

    const setMailto = (els, email) => {
      if (!email || typeof email !== "string") return;
      const clean = email.trim().replace(/\s+/g, "");
      if (!clean) return;
      for (const el of els) {
        if (!(el instanceof HTMLAnchorElement)) continue;
        el.textContent = clean;
        el.href = `mailto:${clean}`;
      }
    };

    setMailto(qsa("[data-email]"), cfg.contactEmail);
    setMailto(qsa("[data-security-email]"), cfg.securityEmail);
  }

  function initYear() {
    const el = qs("[data-year]");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  function initHeaderElevation() {
    const header = qs("header.top[data-elevate]");
    if (!header) return;

    const onScroll = () => {
      header.dataset.elevate = window.scrollY > 6 ? "true" : "false";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initActiveNav() {
    const links = qsa(".navMenu a");
    if (!links.length) return;

    const current = (() => {
      const p = (window.location.pathname || "").split("/").filter(Boolean).pop() || "";
      return p.length ? p : "index.html";
    })();

    for (const a of links) {
      const href = a.getAttribute("href") || "";
      if (!href || href.startsWith("#") || href.startsWith("mailto:")) continue;
      const target = href.split("#")[0].trim();
      if (!target) continue;
      if (target === current) {
        a.classList.add("is-active");
        a.setAttribute("aria-current", "page");
      }
    }
  }

  function initNav() {
    const btn = qs(".navToggle");
    const menu = qs(".navMenu");
    if (!btn || !menu) return;

    const close = () => {
      menu.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    };

    const open = () => {
      menu.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
    };

    btn.addEventListener("click", () => {
      const isOpen = menu.classList.contains("is-open");
      if (isOpen) close();
      else open();
    });

    document.addEventListener("click", (e) => {
      if (!menu.classList.contains("is-open")) return;
      const target = e.target;
      if (target instanceof Element && (menu.contains(target) || btn.contains(target))) return;
      close();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });

    menu.addEventListener("click", (e) => {
      const target = e.target;
      if (!(target instanceof HTMLAnchorElement)) return;
      close();
    });

    window.addEventListener(
      "resize",
      () => {
        // If we leave the mobile breakpoint, let the desktop menu behave normally.
        if (window.innerWidth > 720) close();
      },
      { passive: true }
    );
  }

  function initReveal() {
    const els = qsa(".reveal");
    if (!els.length) return;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      },
      { root: null, threshold: 0.18 }
    );

    els.forEach((el) => io.observe(el));
  }

  function initTyping() {
    const pre = qs("[data-typing]");
    if (!pre) return;

    const full = (pre.textContent || "").replace(/\r\n/g, "\n").trim();
    if (!full) return;

    if (prefersReducedMotion) {
      pre.textContent = full;
      return;
    }

    pre.textContent = "";
    let i = 0;
    let last = performance.now();

    const step = (t) => {
      // Keep it readable: ~35-60 chars/second with small jitter.
      const dt = Math.min(64, t - last);
      last = t;
      const cps = 44 + Math.sin(t / 700) * 12;
      i = Math.min(full.length, i + Math.max(1, Math.floor((cps * dt) / 1000)));
      pre.textContent = full.slice(0, i);
      if (i < full.length) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }

  function initCopyEmail() {
    const btn = qs("[data-copy-email]");
    const link = qs("[data-email]");
    if (!btn || !link) return;

    btn.addEventListener("click", async () => {
      const email = (link.textContent || "").trim();
      if (!email) return;

      try {
        await navigator.clipboard.writeText(email);
        btn.textContent = "Copied";
        window.setTimeout(() => (btn.textContent = "Copy"), 1200);
      } catch {
        // Clipboard might be blocked; fall back to selection.
        const range = document.createRange();
        range.selectNodeContents(link);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
        btn.textContent = "Select + Copy";
        window.setTimeout(() => (btn.textContent = "Copy"), 1600);
      }
    });
  }

  function initContactForm() {
    const form = qs("#contactForm");
    if (!form) return;

    const status = qs(".formStatus", form);
    const cfg = window.LEX_SITE;
    const toEl = qs("[data-email]");
    const to = String(cfg?.contactEmail || toEl?.textContent || "").trim().replace(/\s+/g, "");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const fd = new FormData(form);
      const name = String(fd.get("name") || "").trim();
      const email = String(fd.get("email") || "").trim();
      const msg = String(fd.get("message") || "").trim();

      if (!name || !email || !msg) {
        if (status) status.textContent = "Please fill out all fields.";
        return;
      }

      const subject = `Inquiry from ${name} (Lex website)`;
      const body =
        `Name: ${name}\n` +
        `Email: ${email}\n\n` +
        `Message:\n${msg}\n\n` +
        `---\nSent via Lex site form`;

      const mailto = `mailto:${to || "contact@lexcyberwall.com"}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      if (status) status.textContent = "Opening your email client...";
      window.location.href = mailto;
      window.setTimeout(() => {
        if (status) status.textContent = "If nothing opened, email us directly (link on the left).";
      }, 1200);
    });
  }

  function initNetworkCanvas() {
    const canvas = qs("#net");
    if (!(canvas instanceof HTMLCanvasElement)) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    let w = 0;
    let h = 0;

    const mouse = { x: -9999, y: -9999, active: false };
    const points = [];

    const palette = {
      base: "rgba(6,16,24,0.10)",
      node: "rgba(6,16,24,0.22)",
      a: "rgba(22,199,162,0.24)",
      b: "rgba(14,165,233,0.20)",
    };

    const rand = (min, max) => min + Math.random() * (max - min);

    function resize() {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const targetCount = Math.round(Math.min(92, Math.max(46, (w * h) / 26000)));
      while (points.length < targetCount) {
        points.push({
          x: rand(0, w),
          y: rand(0, h),
          vx: rand(-0.22, 0.22),
          vy: rand(-0.22, 0.22),
          r: rand(1.0, 2.1),
          hue: Math.random() < 0.5 ? "a" : "b",
        });
      }
      while (points.length > targetCount) points.pop();
    }

    function tick() {
      ctx.clearRect(0, 0, w, h);

      // Soft vignette (centered) so the mesh doesn't look "stuck" in a corner.
      const cx = w * 0.52;
      const cy = h * 0.28;
      const grad = ctx.createRadialGradient(cx, cy, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.95);
      grad.addColorStop(0, "rgba(255,255,255,0.0)");
      grad.addColorStop(0.65, "rgba(255,255,255,0.18)");
      grad.addColorStop(1, "rgba(255,255,255,0.42)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      const linkDist = Math.max(110, Math.min(170, Math.sqrt(w * h) / 5.3));
      const linkDist2 = linkDist * linkDist;

      // Update and draw nodes.
      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        ctx.beginPath();
        ctx.fillStyle = palette.node;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw links (O(n^2) but bounded by targetCount).
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        for (let j = i + 1; j < points.length; j++) {
          const q = points[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > linkDist2) continue;
          const t = 1 - d2 / linkDist2;
          ctx.strokeStyle = `rgba(6,16,24,${0.04 + t * 0.12})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }

      // Cursor attraction.
      if (mouse.active) {
        const mx = mouse.x;
        const my = mouse.y;
        for (const p of points) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const d2 = dx * dx + dy * dy;
          const maxD = linkDist * 1.15;
          const maxD2 = maxD * maxD;
          if (d2 > maxD2) continue;
          const t = 1 - d2 / maxD2;
          const col = p.hue === "a" ? palette.a : palette.b;
          ctx.strokeStyle = col.replace("0.24", String(0.08 + t * 0.22)).replace("0.20", String(0.08 + t * 0.22));
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mx, my);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.fillStyle = "rgba(22,199,162,0.20)";
        ctx.arc(mx, my, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    let raf = 0;
    let running = true;

    function loop() {
      if (!running) return;
      tick();
      raf = requestAnimationFrame(loop);
    }

    function start() {
      if (prefersReducedMotion) {
        tick();
        return;
      }
      cancelAnimationFrame(raf);
      running = true;
      loop();
    }

    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    resize();
    start();

    window.addEventListener("resize", () => {
      resize();
      // Redraw once (or continue animation).
      if (prefersReducedMotion) tick();
    });

    window.addEventListener(
      "pointermove",
      (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.active = true;
      },
      { passive: true }
    );

    canvas.addEventListener("pointerleave", () => (mouse.active = false), { passive: true });
    window.addEventListener("blur", () => (mouse.active = false), { passive: true });

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") stop();
      else start();
    });
  }

  initYear();
  initSiteConfig();
  initHeaderElevation();
  initActiveNav();
  initNav();
  initReveal();
  initTyping();
  initCopyEmail();
  initContactForm();
  initNetworkCanvas();
})();
