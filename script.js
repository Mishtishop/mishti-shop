
/* =========================================
   MISHTI CANDLES AND SOAP
   Main JavaScript
========================================= */

// =========================================
// CANDLE PRODUCTS
// Add new candles to this array.
// Images should be stored in the images folder.
// =========================================

const candles = [
  {
    id: "lavender-glow",
    name: "Lavender Glow – Glitter Glass Candle",
    shortName: "Lavender Glow",
    image: "images/lavender-glow-glitter.jpg",
    description: "Small candles… big happiness.",
    category: "HANDMADE CANDLE",
    alt: "Lavender Glow glitter glass candle"
  }

  /*
  EXAMPLE OF ADDING ANOTHER CANDLE:

  ,{
    id: "rose-dream",
    name: "Rose Dream Candle",
    shortName: "Rose Dream",
    image: "images/rose-dream.jpg",
    description: "A beautiful handmade creation.",
    category: "HANDMADE CANDLE",
    alt: "Rose Dream handmade candle"
  }

  */
];


// =========================================
// ELEMENTS
// =========================================

const candleList = document.getElementById("candle-list");

const photo = document.getElementById("photo");
const photoName = document.getElementById("photo-name");
const photoLine = document.getElementById("photo-line");

const productCount = document.getElementById("product-count");

const openPhoto = document.getElementById("open-photo");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-img");
const closePhoto = document.getElementById("close-photo");


// =========================================
// STATE
// =========================================

let selectedCandle = 0;


// =========================================
// DISPLAY CANDLES
// =========================================

function renderCandles() {

  if (!candleList) return;

  candleList.innerHTML = "";

  if (productCount) {
    productCount.textContent =
      `${String(candles.length).padStart(2, "0")} ${candles.length === 1 ? "ITEM" : "ITEMS"}`;
  }

  candles.forEach((candle, index) => {

    const button = document.createElement("button");

    button.type = "button";
    button.className = "product-option";

    button.setAttribute("aria-pressed", "false");

    button.innerHTML = `
      <img
        src="${candle.image}"
        alt=""
        loading="lazy"
      >

      <span class="option-details">
        <strong></strong>
        <span>View candle ↗</span>
      </span>
    `;

    button.querySelector("strong").textContent = candle.shortName;

    button.addEventListener("click", () => {
      selectCandle(index);
    });

    candleList.appendChild(button);

  });

  selectCandle(0);

}


// =========================================
// SELECT A CANDLE
// =========================================

function selectCandle(index) {

  if (!candles.length) return;

  if (index < 0 || index >= candles.length) return;

  selectedCandle = index;

  const candle = candles[index];

  // Update featured image
  photo.src = candle.image;
  photo.alt = candle.alt;

  // Update product information
  photoName.textContent = candle.name;
  photoLine.textContent = candle.description;

  // Update image viewer accessibility
  openPhoto.setAttribute(
    "aria-label",
    `Enlarge photograph of ${candle.name}`
  );

  // Update active selector
  const buttons = candleList.querySelectorAll(".product-option");

  buttons.forEach((button, buttonIndex) => {

    const active = buttonIndex === index;

    button.classList.toggle("active", active);

    button.setAttribute("aria-pressed", String(active));

  });

}


// =========================================
// OPEN PHOTO LIGHTBOX
// =========================================

function showPhoto() {

  if (!lightbox || !lightboxImage) return;

  const candle = candles[selectedCandle];

  if (!candle) return;

  lightboxImage.src = candle.image;
  lightboxImage.alt = candle.alt;

  if (!lightbox.open) {
    lightbox.showModal();
  }

}


// =========================================
// CLOSE PHOTO LIGHTBOX
// =========================================

function hidePhoto() {

  if (lightbox && lightbox.open) {
    lightbox.close();
  }

}


// =========================================
// LIGHTBOX EVENTS
// =========================================

openPhoto.addEventListener("click", showPhoto);

closePhoto.addEventListener("click", hidePhoto);

// Native dialog also closes with Escape.

lightbox.addEventListener("click", (event) => {

  // Close when clicking the dark area outside the image.
  if (event.target === lightbox) {
    hidePhoto();
  }

});


// =========================================
// AUTOMATIC COPYRIGHT YEAR
// =========================================

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// =========================================
// INITIALISE WEBSITE
// =========================================

renderCandles();
