(function () {
  const progress = document.querySelector("[data-progress]");
  const menuButton = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-site-nav]");
  const input = document.querySelector("[data-search-input]");
  const results = document.querySelector("[data-search-results]");
  const base = document.documentElement.dataset.base || "";

  function updateProgress() {
    if (!progress) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(100, Math.max(0, (scrollTop / max) * 100)) : 0;
    progress.style.width = pct + "%";
  }

  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
  }

  if (input && results) {
    let index = [];
    fetch(base + "assets/search-index.json")
      .then((response) => response.json())
      .then((data) => {
        index = data;
      })
      .catch(() => {
        results.textContent = "Η αναζήτηση χρειάζεται άνοιγμα μέσω τοπικού server.";
      });

    input.addEventListener("input", function () {
      const query = input.value.trim().toLowerCase();
      results.innerHTML = "";
      if (query.length < 2) return;
      const hits = index
        .map((item) => {
          const haystack = (item.title + " " + item.text).toLowerCase();
          const score = query
            .split(/\s+/)
            .filter(Boolean)
            .reduce((sum, term) => sum + (haystack.includes(term) ? 1 : 0), 0);
          return { item, score };
        })
        .filter((row) => row.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 6);
      if (!hits.length) {
        results.textContent = "Δεν βρέθηκε κάτι σχετικό.";
        return;
      }
      for (const hit of hits) {
        const link = document.createElement("a");
        link.href = base + hit.item.url;
        link.textContent = hit.item.title;
        results.appendChild(link);
      }
    });
  }
})();
