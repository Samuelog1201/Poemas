// Poemas completos + paletas visuales
const poemas = {
  becquer: {
    titulo: "Rima XXI",
    autor: "Gustavo Adolfo Bécquer",
    emociones: "Amor, intimidad, revelación",
    texto: `¿Qué es poesía?, dices mientras clavas
en mi pupila tu pupila azul.
¿Qué es poesía? ¿Y tú me lo preguntas?
Poesía... eres tú.`,
    paleta: ["#0f172a", "#1d2236", "#f97316", "#fb923c", "#facc15"]
  },

  marti: {
    titulo: "Yo soy un hombre sincero",
    autor: "José Martí",
    emociones: "Identidad, honestidad, raíz",
    texto: `Yo soy un hombre sincero
de donde crece la palma,
y antes de morirme quiero
echar mis versos del alma.

Yo vengo de todas partes,
y hacia todas partes voy:
arte soy entre las artes,
en los montes, monte soy.

Yo sé los nombres extraños
de las yerbas y las flores,
y de mortales engaños,
y de sublimes dolores.

Yo he visto en la noche oscura
llover sobre mi cabeza
los rayos de lumbre pura
de la divina belleza.

Alas nacer vi en los hombros
de las mujeres hermosas:
y salir de los escombros,
volando, las mariposas.

He visto vivir un hombre
con el puñal al costado,
sin decir jamás el nombre
de aquella que lo ha matado.

Rápida, como un reflejo,
dos veces vi el alma, dos:
cuando murió el pobre viejo,
cuando ella me dijo adiós.

Tiemblo si a la reja veo
la luna aparecer,
porque mi novia es morena
y la luna es blanca y cruel.

Yo tengo mis pobres flores
y mis palmas en mi llano:
no me arranquen de la tierra
que me ha dado su calor.`,
    paleta: ["#022c22", "#14532d", "#16a34a", "#4ade80", "#eab308"]
  },

  dario: {
    titulo: "Sonatina",
    autor: "Rubén Darío",
    emociones: "Melancolía, belleza, fantasía",
    texto: `La princesa está triste... ¿qué tendrá la princesa?
Los suspiros se escapan de su boca de fresa,
que ha perdido la risa, que ha perdido el color.
La princesa está pálida en su silla de oro,
está mudo el teclado de su clave sonoro,
y en un vaso olvidada se desmaya una flor.

El jardín puebla el triunfo de los pavos-reales.
Parlotean las aves en los miradores reales.
Y la princesa no ríe, la princesa no siente;
la princesa persigue por el cielo de Oriente
la libélula vaga de una vaga ilusión.

¿Piensa, acaso, en el príncipe de Golconda o de China,
o en el que ha inmolado sus águilas de oro
por ella, la princesa, en un país lejano?
¿O en el que viene en coche de cristal y de escamas
a buscarla, llevando por corona una estrella
y en la mano un lirio de plata?

¡Ay, la pobre princesa de la boca de rosa
quiere ser golondrina, quiere ser mariposa,
tener alas ligeras, bajo el cielo volar,
ir al sol por la escala luminosa de un rayo,
saludar a los lirios con los versos de mayo,
o perderse en el viento sobre el trueno del mar!`,
    paleta: ["#020617", "#111827", "#4f46e5", "#6366f1", "#a855f7"]
  }
};

// Elementos del DOM
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
    const id = card.getAttribute("data-poem-id");
    abrirPoema(id);
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

// Fondo dinámico según interacción
function actualizarFondo(relX, relY) {
  if (!poemaActual) return;

  const paleta = poemaActual.paleta;
  const idx1 = Math.floor(relX * (paleta.length - 1));
  const idx2 = Math.floor(relY * (paleta.length - 1));

  const c1 = paleta[idx1];
  const c2 = paleta[idx2];

  dynamicBg.style.background =
    `radial-gradient(circle at ${relX * 100}% ${relY * 100}%, ${c2}, ${c1} 60%)`;
}

// Eventos táctiles
poemaScreen.addEventListener("touchstart", e => {
  const t = e.touches[0];
  manejarInteraccion(t.clientX, t.clientY);
});

poemaScreen.addEventListener("touchmove", e => {
  const t = e.touches[0];
  manejarInteraccion(t.clientX, t.clientY);
});

// Eventos click (por si abres en PC)
poemaScreen.addEventListener("click", e => {
  manejarInteraccion(e.clientX, e.clientY);
});

function manejarInteraccion(x, y) {
  const relX = x / window.innerWidth;
  const relY = y / window.innerHeight;
  actualizarFondo(relX, relY);
}
