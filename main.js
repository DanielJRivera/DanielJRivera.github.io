// ── Render 3 most recent projects on the landing page ──

function renderRecentProjects() {
  const container = document.getElementById('recent-projects');
  if (!container) return;

  const recent = [...PROJECTS]
    .sort((a, b) => b.year - a.year)
    .slice(0, 3);

  container.innerHTML = recent.map(p => `
    <a class="project-card-mini fade-in" href="${p.github}" target="_blank" rel="noopener">
      <div class="card-img-placeholder">
        ${p.image
          ? `<img src="${p.image}" alt="${p.title}" />`
          : `<span class="placeholder-text">// image</span>`
        }
      </div>
      <div class="card-body">
        <div class="card-year">${p.year}</div>
        <div class="card-title">${p.title}</div>
        <div class="card-desc">${p.desc}</div>
        <div class="card-tags">
          ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
    </a>
  `).join('');

  observeFadeIns();
}

// ── Intersection Observer for fade-in animations ──

function observeFadeIns() {
  const els = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  renderRecentProjects();
  observeFadeIns();
});
