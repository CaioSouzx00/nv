const CONFIG = {

  institutionName: "Faculdade Nova Era",

  heroTitle: "Seu futuro começa aqui",
  heroSubtitle: "Graduação, pós-graduação, tecnólogos e cursos livres. Escolha o que faz sentido pra você.",

  whatsappNumber: "5519998466808",
  whatsappMessage: "Olá! Vim pelo site e gostaria de sabe como adquirir meu diploma.",

  GA_MEASUREMENT_ID: "",
  GTM_ID: "",

  courseCategories: [
    {
      label: "Graduação",
      courses: [
        { name: "Administração" },
        { name: "Direito" },
        { name: "Enfermagem" },
        { name: "Engenharia Civil" },
        { name: "Psicologia" },
        { name: "Pedagogia" },
        { name: "Ciência da Computação" },
        { name: "Contabilidade" },
        { name: "Medicina Veterinária" },
        { name: "Farmácia" },
        { name: "Fisioterapia" },
        { name: "Nutrição" },
        { name: "Educação Física" },
        { name: "Arquitetura e Urbanismo" },
        { name: "Engenharia de Produção" },
        { name: "Serviço Social" },
        { name: "Publicidade e Propaganda" },
        { name: "Jornalismo" },
        { name: "Biomedicina" },
        { name: "Odontologia" },
      ]
    },
    {
      label: "Tecnólogo",
      courses: [
        { name: "Análise e Desenvolvimento de Sistemas" },
        { name: "Gestão de Recursos Humanos" },
        { name: "Marketing" },
        { name: "Logística" },
        { name: "Gestão Financeira" },
        { name: "Radiologia" },
      ]
    },
    {
      label: "Pós-Graduação",
      courses: [
        { name: "MBA em Gestão de Negócios" },
        { name: "MBA em Marketing Digital" },
        { name: "MBA em Gestão de Pessoas" },
        { name: "MBA em Finanças e Controladoria" },
        { name: "Direito Trabalhista" },
        { name: "Direito Civil e Processual Civil" },
        { name: "Enfermagem do Trabalho" },
        { name: "Psicopedagogia" },
        { name: "Docência do Ensino Superior" },
        { name: "Engenharia de Segurança do Trabalho" },
        { name: "Gestão Hospitalar" },
        { name: "Saúde Pública" },
        { name: "Neuropsicologia" },
        { name: "Gestão Ambiental" },
      ]
    },
    {
      label: "Cursos Livres",
      courses: [
        { name: "Excel Avançado" },
        { name: "Design Gráfico" },
        { name: "Inglês Instrumental" },
        { name: "Oratória e Comunicação" },
        { name: "Libras" },
        { name: "Redação Empresarial" },
        { name: "Primeiros Socorros" },
        { name: "Gestão de Projetos" },
        { name: "Marketing de Conteúdo" },
        { name: "Informática Básica" },
        { name: "Fotografia" },
        { name: "Espanhol Básico" },
      ]
    }
  ],

  perks: [
    "Diploma reconhecido pelo MEC",
  ],

  testimonials: [],

  faq: [
    { q: "Como faço pra comprar o diploma?", a: "Fala com a gente no WhatsApp que te orientamos." },
    { q: "Oferece muitas variedades de diplomas de faculdades??", a: "Sim, oferecemos diversos diplomas de difrentes faculdades" },
    { q: "O diploma é reconhecido?", a: "Sim, todos reconhecidos pelo MEC." },
  ]
};

// ═══════════════════════════════════════════════════════

const Analytics = {
  init() {
    if (CONFIG.GTM_ID) {
      const s = document.createElement('script');
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtm.js?id=${CONFIG.GTM_ID}`;
      document.head.appendChild(s);
      window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    }
    if (CONFIG.GA_MEASUREMENT_ID) {
      const s = document.createElement('script');
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.GA_MEASUREMENT_ID}`;
      document.head.appendChild(s);
      s.onload = () => {
        window.gtag = function () { window.dataLayer.push(arguments); };
        window.gtag('js', new Date());
        window.gtag('config', CONFIG.GA_MEASUREMENT_ID);
      };
    }
    this.track('page_view');
  },
  track(ev, p = {}) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: ev, ...p });
    if (typeof window.gtag === 'function') window.gtag('event', ev, p);
  }
};

function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
function wppURL(msg) {
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg || CONFIG.whatsappMessage)}`;
}

let activeTab = 0;

function renderCourseTabs() {
  const el = document.getElementById('courseTabs');
  if (!el) return;
  el.innerHTML = CONFIG.courseCategories.map((cat, i) =>
    `<button class="tab ${i === activeTab ? 'tab--active' : ''}" data-tab="${i}">${esc(cat.label)}</button>`
  ).join('');

  el.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-tab]');
    if (!btn) return;
    activeTab = parseInt(btn.dataset.tab);
    renderCourseTabs();
    renderCourseGrid();
  });
}

function renderCourseGrid() {
  const el = document.getElementById('courseGrid');
  if (!el) return;
  const cat = CONFIG.courseCategories[activeTab];
  if (!cat) return;

  el.innerHTML = cat.courses.map(c => `
    <div class="course-card fade-in-up">
      <h3 class="course-card__name">${esc(c.name)}</h3>
      <div class="course-card__meta">
        <span>${esc(c.duration)}</span>
        <span>${esc(c.mode)}</span>
      </div>
      <a href="#" class="course-card__link" data-course="${esc(c.name)}">Saber mais</a>
    </div>
  `).join('');

  el.querySelectorAll('[data-course]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const name = link.dataset.course;
      Analytics.track('click_whatsapp', { location: 'course', course: name });
      window.open(wppURL(`Olá! Vim pelo site da faculdade e tenho interesse no curso de ${name}. Gostaria de saber mais sobre como comprar esse diploma`), '_blank');
    });
  });

  requestAnimationFrame(() => initAnim());
}

function renderPerks() {
  const el = document.getElementById('perksGrid');
  if (!el) return;
  el.innerHTML = CONFIG.perks.map(text => `
    <div class="perk fade-in-up"><span class="perk__text">${esc(text)}</span></div>
  `).join('');
}

function renderTestimonials() {
  const section = document.getElementById('depoimentos');
  const grid = document.getElementById('testimonialsGrid');
  if (!section || !grid) return;
  if (!CONFIG.testimonials.length) { section.style.display = 'none'; return; }

  section.style.display = '';
  grid.innerHTML = CONFIG.testimonials.map(t => {
    const initials = t.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    const av = t.photo
      ? `<img class="testimonial__avatar" src="${esc(t.photo)}" alt="${esc(t.name)}" loading="lazy" />`
      : `<div class="testimonial__avatar testimonial__avatar--placeholder">${initials}</div>`;
    return `
      <div class="testimonial__card fade-in-up">
        <p class="testimonial__quote">"${esc(t.quote)}"</p>
        <div class="testimonial__author">${av}<strong>${esc(t.name)}</strong></div>
      </div>`;
  }).join('');
}

function renderFaq() {
  const el = document.getElementById('faqAccordion');
  if (!el) return;
  el.innerHTML = CONFIG.faq.map(f => `
    <div class="accordion-item fade-in-up" data-accordion="faq">
      <div class="accordion-header" role="button" tabindex="0" aria-expanded="false">
        <span class="accordion-header__title">${esc(f.q)}</span>
        <svg class="accordion-header__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </div>
      <div class="accordion-body">
        <div class="accordion-body__content">${esc(f.a)}</div>
      </div>
    </div>
  `).join('');
}

function renderWhatsApp() {
  const btn = document.getElementById('whatsappBtn');
  if (btn && CONFIG.whatsappNumber) btn.href = wppURL();
}

function updateTexts() {
  const t = document.getElementById('heroTitle');
  const s = document.getElementById('heroSubtitle');
  if (t) t.textContent = CONFIG.heroTitle;
  if (s) s.textContent = CONFIG.heroSubtitle;
  document.title = CONFIG.institutionName;
  const y = document.getElementById('footerYear');
  if (y) y.textContent = new Date().getFullYear();
}

function initAccordions() {
  document.addEventListener('click', (e) => {
    const header = e.target.closest('.accordion-header');
    if (!header) return;
    const item = header.closest('.accordion-item');
    const body = item.querySelector('.accordion-body');
    const content = body.querySelector('.accordion-body__content');
    const open = item.classList.contains('is-open');
    const group = item.dataset.accordion;

    if (group) {
      document.querySelectorAll(`.accordion-item[data-accordion="${group}"]`).forEach(o => {
        if (o !== item && o.classList.contains('is-open')) {
          o.classList.remove('is-open');
          o.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
          o.querySelector('.accordion-body').style.maxHeight = '0';
        }
      });
    }
    item.classList.toggle('is-open', !open);
    header.setAttribute('aria-expanded', String(!open));
    body.style.maxHeight = open ? '0' : content.scrollHeight + 24 + 'px';
  });

  document.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('.accordion-header')) {
      e.preventDefault();
      e.target.closest('.accordion-header').click();
    }
  });
}

function initCTAs() {
  const url = wppURL();
  document.querySelectorAll('[data-cta]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      Analytics.track('click_whatsapp', { location: btn.dataset.cta });
      window.open(url, '_blank');
    });
  });
  const w = document.getElementById('whatsappBtn');
  if (w) w.addEventListener('click', () => Analytics.track('click_whatsapp', { location: 'float' }));
}

function initMobileSticky() {
  const bar = document.getElementById('mobileCta');
  const hero = document.getElementById('hero');
  if (!bar || !hero) return;
  new IntersectionObserver(
    ([e]) => bar.classList.toggle('is-visible', !e.isIntersecting),
    { threshold: 0.1 }
  ).observe(hero);
}

function initAnim() {
  const els = document.querySelectorAll('.fade-in-up:not(.is-visible)');
  if (!els.length) return;
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); } }),
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );
  els.forEach(el => obs.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  updateTexts();
  renderCourseTabs();
  renderCourseGrid();
  renderPerks();
  renderTestimonials();
  renderFaq();
  renderWhatsApp();
  initAccordions();
  initCTAs();
  initMobileSticky();
  Analytics.init();
  requestAnimationFrame(() => requestAnimationFrame(initAnim));
});
