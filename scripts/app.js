const home = document.getElementById("homeScreen");
const poemaScreen = document.getElementById("poemaScreen");
const dynamicBg = document.getElementById("dynamicBg");

const poemTitle = document.getElementById("poemTitle");
const poemMeta = document.getElementById("poemMeta");
const poemText = document.getElementById("poemText");

const backBtn = document.getElementById("backBtn");

let poemaActual = null;

// Navegación
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    abrirPoema(card.getAttribute("data-poem-id"));
  });
});

backBtn.addEventListener("click", volverHome);

function abrirPoema(id) {
  poemaActual = poemas[id];

  poemTitle.textContent = poemaActual.titulo;
  poemMeta.textContent = `${poemaActual.autor} · ${poemaActual.emociones}`;
  poemText.textContent = poemaActual.texto;

  home.style.display = "none";
  poemaScreen.style.display = "block";

  actualizarFondo(0.5, 0.5);
}

function volverHome() {
  poemaActual = null;
  poemaScreen.style.display = "none";
  home.style.display = "block";
  dynamicBg.style.background = "transparent";
}

// Fondo dinámico
function actualizarFondo(relX, relY) {
  if (!poemaActual) return;

  const paleta = poemaActual.paleta;
  const i1 = Math.floor(relX * (paleta.length - 1));
  const i2 = Math.floor(relY * (paleta.length - 1));

  dynamicBg.style.background =
    `radial-gradient(circle at ${relX * 100}% ${relY * 100}%, ${paleta[i2]}, ${paleta[i1]} 60%)`;
}

// Prevenir scroll/pull-to-refresh
document.addEventListener("touchmove", e => {
  if (poemaActual) e.preventDefault();
}, { passive: false });

// Eventos táctiles globales
document.addEventListener("touchstart", e => {
  if (!poemaActual) return;
  const t = e.touches[0];
  manejarInteraccion(t.clientX, t.clientY);
});

document.addEventListener("touchmove", e => {
  if (!poemaActual) return;
  const t = e.touches[0];
  manejarInteraccion(t.clientX, t.clientY);
});

// Click para PC
document.addEventListener("click", e => {
  if (!poemaActual) return;
  manejarInteraccion(e.clientX, e.clientY);
});

function manejarInteraccion(x, y) {
  const relX = x / window.innerWidth;
  const relY = y / window.innerHeight;
  actualizarFondo(relX, relY);
}
