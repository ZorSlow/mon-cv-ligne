// ==================== MODE SOMBRE ====================
(function setupThemeToggle() {
  const body = document.body;
  const toggle = document.getElementById("theme-toggle");
  const THEME_KEY = "bbah-theme";

  const applyTheme = (theme) => {
    if (theme === "dark") {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }
  };

  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored) {
    applyTheme(stored);
  }

  if (toggle) {
    toggle.addEventListener("click", () => {
      const isDark = body.classList.toggle("dark-mode");
      window.localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
    });
  }
})();

// ==================== FILTRE PROJETS ====================
(function setupProjectFilters() {
  const buttons = document.querySelectorAll(".project-filter-btn");
  const cards = document.querySelectorAll(".project-card");

  if (!buttons.length || !cards.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      cards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
})();

// ==================== FORMULAIRE CONTACT ====================
(function setupContactForm() {
  const form = document.getElementById("contact-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const messageBox = document.getElementById("form-message");

  if (!form || !nameInput || !emailInput || !messageInput || !messageBox) return;

  const setMessage = (text, type) => {
    messageBox.textContent = text;
    messageBox.className = "form-message " + type;
  };

  const isValidEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).toLowerCase());

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      setMessage("Merci de remplir tous les champs.", "error");
      return;
    }

    if (!isValidEmail(email)) {
      setMessage("Merci de saisir une adresse email valide.", "error");
      return;
    }

    setMessage(
      "Merci pour votre message ! Je vous répondrai dès que possible.",
      "success"
    );

    form.reset();
  });
})();

(() => {
  const CV_URL = "assets/cv-boubacar-bah.pdf";
  const CV_FILENAME = "CV-Boubacar-Bah.pdf";

  const downloadBtn = document.getElementById("btn-download-cv");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", async (e) => {
      // L'attribut download suffit souvent, mais fetch+blob rend le comportement plus fiable (mobile / certains navigateurs).
      e.preventDefault();

      try {
        const res = await fetch(CV_URL, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const blob = await res.blob();
        const objectUrl = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = objectUrl;
        a.download = CV_FILENAME;
        document.body.appendChild(a);
        a.click();
        a.remove();

        URL.revokeObjectURL(objectUrl);
      } catch (err) {
        alert(
          `Le CV n'est pas disponible pour le moment.\n\nAjoute ton PDF ici : ${CV_URL}`
        );
      }
    });
  }
})();

