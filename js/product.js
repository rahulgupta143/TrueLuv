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
/* ================= STATE ================= */
let currentProduct = null;
let currentIndex = 0;

/* ================= FETCH PRODUCT ================= */
fetch(`https://trueluv-backend.onrender.com/api/products/${productId}`)
  .then((res) => res.json())
  .then((product) => {
    currentProduct = product;
    skeleton.style.display = "none";

    /* BASIC INFO */
    nameEl.innerText = product.name;
    priceEl.innerText = "₹" + product.price;

    /* STOCK (SAFE) */
    const stockText = product.stock || "In Stock";
    pStock.innerText = stockText;
    pStock.style.color = stockText === "In Stock" ? "green" : "red";

    /* DESCRIPTION */
    descEl.innerText = product.desc || "No description available";
    console.log(product);
    fullDescEl.innerText = product.fullDesc || product.desc || "";
    console.log(product.fullDesc);
    /* MAIN IMAGE */
    mainImg.src = product.images?.[0] || "";

    /* THUMBNAILS */
    thumbs.innerHTML = "";
    product.images.forEach((img, index) => {
      const t = document.createElement("img");
      t.src = img;

      if (index === 0) t.classList.add("selected");

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
    loadRelatedProducts(product.category, product._id);
  })
  .catch((err) => {
    console.error("Product Fetch Error:", err);
    skeleton.innerHTML = "<p style='color:red'>Failed to load product.</p>";
  });

/* ================= RELATED PRODUCTS ================= */
function loadRelatedProducts(category, currentId) {
  fetch(
    `https://trueluv-backend.onrender.com/api/products/related/${category}/${currentId}`,
  )
    .then((res) => res.json())
    .then((related) => {
      relatedBox.innerHTML = "";

      if (!related.length) {
        relatedBox.innerHTML = "<p>No related products found.</p>";
        return;
      }

      related.forEach((p) => {
        relatedBox.innerHTML += `
          <div class="product-card" onclick="openProduct('${p._id}')">
            <img src="${p.images?.[0] || ""}" />
            <h3>${p.name}</h3>
            <p class="price">₹${p.price}</p>
          </div>
        `;
      });
    })
    .catch(() => {
      relatedBox.innerHTML = "<p>Error loading related products</p>";
    });
}

/* ================= NAVIGATE ================= */
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
mainImg.addEventListener("click", () => {
  if (!currentProduct) return;

  imgModal.style.display = "flex";
  modalSlider.innerHTML = "";

  currentProduct.images.forEach((img) => {
    const image = document.createElement("img");
    image.src = img;
    image.style.display = "none";
    modalSlider.appendChild(image);
  });

  currentIndex = 0;
  showImage(currentIndex);

  if (currentProduct.images.length > 1) {
    prevBtn.style.display = "block";
    nextBtn.style.display = "block";
  } else {
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
  }
});

function showImage(index) {
  const imgs = modalSlider.querySelectorAll("img");
  imgs.forEach((img, i) => {
    img.style.display = i === index ? "block" : "none";
  });
}

function changeImg(direction) {
  const total = currentProduct.images.length;
  currentIndex += direction;

  if (currentIndex < 0) currentIndex = total - 1;
  if (currentIndex >= total) currentIndex = 0;

  showImage(currentIndex);
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener("click", () => changeImg(-1));
  nextBtn.addEventListener("click", () => changeImg(1));
}

function closeModal() {
  imgModal.style.display = "none";
}

/* ================= SEE MORE ================= */
if (seeMoreBtn) {
  seeMoreBtn.addEventListener("click", () => {
    fullDescEl.classList.toggle("expanded");
    seeMoreBtn.innerText = fullDescEl.classList.contains("expanded")
      ? "See less"
      : "See more";
  });
}

const highlightsList = document.getElementById("highlightsList");
const trustBadgesContainer = document.getElementById("trustBadges");

const productHighlights = [
  "Eco-friendly material",
  "Available in multiple colors",
  "Free shipping over ₹500",
  "1 Year Warranty",
  "Premium quality",
];

const trustBadges = [
  "✅ 100+ Happy Customers",
  "🚚 Fast Delivery",
  "💯 Verified Quality",
  "💳 Secure Payments",
];

// Load highlights dynamically
highlightsList.innerHTML = productHighlights
  .map((item) => `<li>${item}</li>`)
  .join("");

// Load trust badges dynamically
trustBadgesContainer.innerHTML = trustBadges
  .map((badge) => `<span>${badge}</span>`)
  .join("");

// document.getElementById("addReviewBtn").addEventListener("click", async () => {
//   const name = document.getElementById("rName").value.trim();
//   const comment = document.getElementById("rComment").value.trim();
//   const rating = parseInt(document.getElementById("rRating").value);

//   if (!name || !comment || !rating) return alert("Fill all fields");

//   try {
//     const res = await fetch(
//       `http://localhost:5000/api/products/review/${productId}`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, comment, rating }),
//       },
//     );

//     if (!res.ok) throw new Error("Failed to add review");

//     const updatedProduct = await res.json();
//     renderReviews(updatedProduct.reviews);

//     // Reset form
//     document.getElementById("rName").value = "";
//     document.getElementById("rComment").value = "";
//     document.getElementById("rRating").value = "5";
//   } catch (err) {
//     console.error(err);
//     alert("Something went wrong");
//   }
// });
