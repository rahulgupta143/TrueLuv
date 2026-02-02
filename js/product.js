/* ================= URL PARAM ================= */
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

/* ================= DOM ELEMENTS ================= */
const nameEl = document.getElementById("pName");
const priceEl = document.getElementById("pPrice");
const pStock = document.getElementById("pStock");
const descEl = document.getElementById("pDesc");
const fullDescEl = document.getElementById("pFullDesc");
const mainImg = document.getElementById("mainImg");
const thumbs = document.getElementById("thumbs");
const relatedBox = document.getElementById("relatedProducts");
const dmBtn = document.getElementById("dmBtn");
const skeleton = document.getElementById("productSkeleton");

/* MODAL */
const imgModal = document.getElementById("imgModal");
const modalSlider = document.getElementById("modalSlider");
const prevBtn = document.querySelector(".slider-btn.prev");
const nextBtn = document.querySelector(".slider-btn.next");
const seeMoreBtn = document.getElementById("seeMore");

let currentProduct = null;
let currentIndex = 0;

/* ================= LOAD PRODUCT ================= */
fetch("data/products.json")
  .then((res) => res.json())
  .then((products) => {
    const product = products.find((p) => p.id === productId);

    if (!product) {
      skeleton.innerHTML = "<p style='color:red'>Product not found</p>";
      return;
    }

    currentProduct = product;
    skeleton.style.display = "none";

    /* BASIC INFO */
    nameEl.innerText = product.name;
    priceEl.innerText = "₹" + product.price;
    pStock.innerText = product.stock || "In Stock";
    pStock.style.color = "green";

    descEl.innerText = product.desc || "";
    fullDescEl.innerText = product.fullDesc || "";

    /* IMAGE HANDLING (image OR images) */
    const images = product.images
      ? product.images
      : product.image
        ? [product.image]
        : ["img/default.png"];

    /* MAIN IMAGE */
    mainImg.src = images[0];

    /* THUMBNAILS */
    thumbs.innerHTML = "";
    images.forEach((img, i) => {
      const t = document.createElement("img");
      t.src = img;
      if (i === 0) t.classList.add("selected");

      t.onclick = () => {
        mainImg.src = img;
        document
          .querySelectorAll("#thumbs img")
          .forEach((el) => el.classList.remove("selected"));
        t.classList.add("selected");
      };
      thumbs.appendChild(t);
    });

    /* RELATED PRODUCTS */
    loadRelatedProducts(products, product.category, product.id);
  });

/* ================= RELATED PRODUCTS ================= */
function loadRelatedProducts(allProducts, category, currentId) {
  const related = allProducts.filter(
    (p) => p.category === category && p.id !== currentId,
  );

  relatedBox.innerHTML = "";

  if (!related.length) {
    relatedBox.innerHTML = "<p>No related products</p>";
    return;
  }

  related.forEach((p) => {
    const img = p.image || (p.images && p.images[0]) || "img/default.png";

    relatedBox.innerHTML += `
      <div class="product-card" onclick="openProduct('${p.id}')">
        <img src="${img}" />
        <h3>${p.name}</h3>
        <p class="price">₹${p.price}</p>
      </div>
    `;
  });
}

/* ================= NAVIGATION ================= */
function openProduct(id) {
  window.location.href = `product.html?id=${id}`;
}

/* ================= DM BUTTON ================= */
dmBtn.onclick = () => {
  if (!currentProduct) return;

  const msg = `Hi, I want to order 👇
Product: ${currentProduct.name}
Price: ₹${currentProduct.price}`;

  window.open(
    "https://wa.me/918928080078?text=" + encodeURIComponent(msg),
    "_blank",
  );
};

/* ================= IMAGE MODAL ================= */
mainImg.onclick = () => {
  if (!currentProduct) return;

  const images = currentProduct.images
    ? currentProduct.images
    : [currentProduct.image];

  imgModal.style.display = "flex";
  modalSlider.innerHTML = "";

  images.forEach((img) => {
    const i = document.createElement("img");
    i.src = img;
    i.style.display = "none";
    modalSlider.appendChild(i);
  });

  currentIndex = 0;
  showImage(currentIndex);
};

function showImage(index) {
  const imgs = modalSlider.querySelectorAll("img");
  imgs.forEach((img, i) => {
    img.style.display = i === index ? "block" : "none";
  });
}

function changeImg(dir) {
  const imgs = modalSlider.querySelectorAll("img");
  currentIndex += dir;
  if (currentIndex < 0) currentIndex = imgs.length - 1;
  if (currentIndex >= imgs.length) currentIndex = 0;
  showImage(currentIndex);
}

prevBtn.onclick = () => changeImg(-1);
nextBtn.onclick = () => changeImg(1);

function closeModal() {
  imgModal.style.display = "none";
}

/* ================= SEE MORE ================= */
seeMoreBtn.onclick = () => {
  fullDescEl.classList.toggle("expanded");
  seeMoreBtn.innerText = fullDescEl.classList.contains("expanded")
    ? "See less"
    : "See more";
};
const highlightsList = document.getElementById("highlightsList");

const productHighlights = [
  "Handpicked & Unique Designs",
  "High-Quality Materials",
  "Trendy & Stylish for Daily Wear",
  "Perfect Gift for Loved Ones",
  "Affordable Prices",
  "Limited Stock – Grab Yours Fast",
  "Fast & Safe Delivery",
];

// Load highlights dynamically
if (highlightsList) {
  highlightsList.innerHTML = productHighlights
    .map((item) => `<li>${item}</li>`)
    .join("");
}
