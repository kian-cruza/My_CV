document.getElementById("year").textContent = new Date().getFullYear();

(function () {
  const storageKey = "rd-theme";
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const prefersLight = window.matchMedia
    ? window.matchMedia("(prefers-color-scheme: light)")
    : { matches: false };
  let canStore = true;

  try {
    localStorage.getItem(storageKey);
  } catch (error) {
    canStore = false;
  }

  const getPreferredTheme = () => {
    const stored = canStore ? localStorage.getItem(storageKey) : null;
    if (stored === "light" || stored === "dark") {
      return stored;
    }
    return prefersLight.matches ? "light" : "dark";
  };

  const applyTheme = (theme) => {
    const mode = theme === "light" ? "light" : "dark";
    root.setAttribute("data-theme", mode);
    
    if (canStore) {
      localStorage.setItem(storageKey, mode);
    }
    
    if (toggle) {
      const isLight = mode === "light";
      toggle.setAttribute("aria-pressed", String(isLight));
      toggle.classList.toggle("is-light", isLight);
      
      const label = toggle.querySelector(".theme-label");
      if (label) {
        label.textContent = isLight
          ? "Switch to dark mode"
          : "Switch to light mode";
      }
    }
  };

  applyTheme(getPreferredTheme());

  toggle?.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(current);
  });

  const handlePreferenceChange = (event) => {
    if (!canStore || !localStorage.getItem(storageKey)) {
      applyTheme(event.matches ? "light" : "dark");
    }
  };

  if (typeof prefersLight.addEventListener === "function") {
    prefersLight.addEventListener("change", handlePreferenceChange);
  } else if (typeof prefersLight.addListener === "function") {
    prefersLight.addListener(handlePreferenceChange);
  }
})();