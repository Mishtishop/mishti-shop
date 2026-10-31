/* ------------------------------------------------------------------
   ADD OR EDIT CANDLES / SOAPS HERE
   Each block is one item in the list. To add a new one:
   1. Put its photo in the "images" folder (e.g. images/lavender-soap.jpg)
   2. Copy one block below, paste it at the end (add a comma after the previous block)
   3. Change the id (no spaces), name, line, image, alt and colours
   ------------------------------------------------------------------ */
const products = [
  {
    id: "lavender-glow-glitter",
    name: "Lavender Glow – Glitter Glass Candle",
    line: "Small candles… big happiness.",
    image: "images/lavender-glow-glitter.jpg",
    alt: "Lavender Glow glass candle with a purple wax top, glitter and a clear glass base, shown with lavender flowers and in a gift box",
    accent: "#6b3fa0",   /* button and highlight colour */
    tint: "#f3edfa"      /* soft page background */
  },
  {
    id: "lavender-glow-flower",
    name: "Lavender Glow – Flower Candle",
    line: "Calm mind, happy heart.",
    image: "images/lavender-glow-flower.jpg",
    alt: "Lavender Glow scented candle in glass with a purple flower on top of white wax and a deep purple glitter base",
    accent: "#3f2a9c",
    tint: "#eeebf9"
  },
  {
    id: "ocean-candle",
    name: "Ocean Candle",
    line: "Bring the beach home.",
    image: "images/ocean-candle.jpg",
    alt: "Ocean candle in glass with white wax, small shells and blue sparkle, layered over blue gel, shown with starfish and seashells",
    accent: "#1f5fa8",
    tint: "#e9f3fb"
  },
  {
    id: "rose-candle",
    name: "Rose Candle",
    line: "Small candle… big happiness.",
    image: "images/rose-candle.jpg",
    alt: "Pink rose-shaped candle with layered petals, shown from several angles and in a gift box",
    accent: "#a3274f",
    tint: "#fbeaef"
  },
  {
    id: "floral-ball-candle",
    name: "Floral Ball Candle",
    line: "Brighten your space naturally.",
    image: "images/floral-ball-candle.jpg",
    alt: "Two round yellow textured ball candles with silver flakes, shown lit and in a gift box",
    accent: "#8a5a00",
    tint: "#fdf3d8"
  },
  {
    id: "carnation-flower-candle",
    name: "Carnation Flower Candle",
    line: "Small candle… big happiness.",
    image: "images/carnation-flower-candle.jpg",
    alt: "A lilac and a red carnation-shaped candle on a wooden slice, shown in a gift box with a handmade tag",
    accent: "#c0185f",
    tint: "#fcebf2"
  }
];

/* ------------------- you don't need to edit below ------------------- */

const list = document.getElementById("candle-list");
const photo = document.getElementById("photo");
const photoName = document.getElementById("photo-name");
const photoLine = document.getElementById("photo-line");
const root = document.documentElement;
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

/* Build the list of names */
products.forEach((p) => {
  const li = document.createElement("li");
  const btn = document.createElement("button");
  btn.type = "button";
  btn.dataset.id = p.id;
  btn.innerHTML = '<span class="swatch" style="background:' + p.accent + '"></span><span class="label"></span>';
  btn.querySelector(".label").textContent = p.name;
  btn.addEventListener("click", () => select(p.id, true));
  li.appendChild(btn);
  list.appendChild(li);
});

function select(id, updateHash) {
  const p = products.find((x) => x.id === id) || products[0];

  root.style.setProperty("--accent", p.accent);
  root.style.setProperty("--tint", p.tint);

  list.querySelectorAll("button").forEach((b) => {
    b.setAttribute("aria-pressed", b.dataset.id === p.id ? "true" : "false");
  });

  if (!photo.src.endsWith(p.image)) {
    photo.classList.add("swap");
    const next = new Image();
    next.onload = () => {
      photo.src = p.image;
      photo.alt = p.alt;
      requestAnimationFrame(() => photo.classList.remove("swap"));
    };
    next.src = p.image;
  }
  photoName.textContent = p.name;
  photoLine.textContent = p.line;

  if (updateHash) {
    try { history.replaceState(null, "", "#" + p.id); } catch (e) {}
  }
}

/* Start on the candle named in the link (e.g. site/#rose-candle), else the first one */
const startId = location.hash.slice(1);
select(products.some((p) => p.id === startId) ? startId : products[0].id, false);
window.addEventListener("hashchange", () => {
  const id = location.hash.slice(1);
  if (products.some((p) => p.id === id)) select(id, false);
});

/* Enlarge photo */
document.getElementById("open-photo").addEventListener("click", () => {
  lightboxImg.src = photo.src;
  lightboxImg.alt = photo.alt;
  lightbox.showModal();
});
document.getElementById("close-photo").addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) lightbox.close(); });

document.getElementById("year").textContent = new Date().getFullYear();
