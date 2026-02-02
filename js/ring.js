window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("ringProducts");
  if (!container) return;

  fetch("data/products.json")
    .then((res) => res.json())
    .then((allProducts) => {
      // 🔹 ONLY RING PRODUCTS
      const ringProducts = allProducts.filter((p) => p.category === "ring");

      container.innerHTML = "";

      if (!ringProducts.length) {
        container.innerHTML = "<p>No products found in this category.</p>";
        return;
      }

      ringProducts.forEach((p) => {
        const imgSrc =
          p.images && p.images.length ? p.images[0] : "img/default.png";
        container.innerHTML += `
    <div class="product-card" onclick="openProduct('${p.id}')">
      <img src="${imgSrc}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>${p.desc || "No description available"}</p>
      <p class="price">₹${p.price}</p>

      <button onclick="event.stopPropagation(); dmOrder('${p.name}','${p.price}','${imgSrc}')">
        DM to Order
      </button>
    </div>
  `;
      });
    })
    .catch((err) => {
      console.error("Error loading products.json", err);
      container.innerHTML = "<p>Unable to load products.</p>";
    });
});

// 🔹 OPEN PRODUCT PAGE
function openProduct(id) {
  window.location.href = `product.html?id=${id}`;
}

// 🔹 WHATSAPP ORDER
function dmOrder(name, price, img) {
  const message = `Hi, I want to order this product 👇

Product: ${name}
Price: ₹${price}
Image: ${window.location.origin}/${img}`;

  const whatsappUrl =
    "https://wa.me/918928080078?text=" + encodeURIComponent(message);

  window.open(whatsappUrl, "_blank");
}

// 🔹 RELATED PRODUCTS
function loadRelatedProducts(category, currentId) {
  const relatedBox = document.getElementById("relatedProducts");

  fetch("data/products.json")
    .then((res) => res.json())
    .then((allProducts) => {
      const related = allProducts.filter(
        (p) => p.category === category && p.id !== currentId,
      );

      relatedBox.innerHTML = "";

      if (!related.length) {
        relatedBox.innerHTML = "<p>No related products found.</p>";
        return;
      }

      related.forEach((p) => {
        relatedBox.innerHTML += `
          <div class="product-card" onclick="openProduct('${p.id}')">
            <img src="${p.images[0]}" alt="${p.name}" />
            <h3>${p.name}</h3>
            <p class="price">₹${p.price}</p>
          </div>
        `;
      });
    });
}
