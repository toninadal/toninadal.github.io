let heroIndex = 0;
let heroTitles = [];

function setLanguage(lang) {
  fetch(`./data/${lang}.json`)
    .then(res => res.json())
    .then(data => {
      // Hero banner
      heroTitles = data.hero.titles;
      document.getElementById("hero-subtitle").textContent = data.hero.subtitle;
      document.getElementById("hero-cta").textContent = data.hero.cta;
      rotateHeroText();

      // About
      document.getElementById("about").innerHTML = `
        <h2>${data.about.title}</h2>
        <p>${data.about.text}</p>
      `;

      // Timeline
      const timeline = document.getElementById("timeline");
      timeline.innerHTML = `<h2>Experiencia & Formación</h2>`;
      data.timeline.forEach(item => {
        const entry = document.createElement("div");
        entry.classList.add("timeline-item");
        entry.innerHTML = `<h3>${item.year} - ${item.title}</h3><p>${item.description}</p>`;
        timeline.appendChild(entry);
      });

      // Contacto
      document.getElementById("contact").innerHTML = `
        <h2>Contacto</h2>
        <p>Email: <a href="mailto:${data.contact.email}">${data.contact.email}</a></p>
        <p>Teléfono: ${data.contact.phone}</p>
        <p><a href="${data.contact.linkedin}" target="_blank">LinkedIn</a></p>
      `;
    })
    .catch(err => console.error("Error cargando idioma:", err));
}

// Rotar títulos del hero cada 3 segundos
function rotateHeroText() {
  const heroTitle = document.getElementById("hero-title");
  heroTitle.textContent = heroTitles[heroIndex];
  heroIndex = (heroIndex + 1) % heroTitles.length;
  setTimeout(rotateHeroText, 3000);
}
