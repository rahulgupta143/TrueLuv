window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("pendantProducts");
  if (!container) return;

  // 🔹 Load products.json
  fetch("data/products.json")
    .then((res) => res.json())
    .then((products) => {
      // 🔹 Only pendants
      const pendants = products.filter((p) => p.category === "pendant");

      container.innerHTML = "";

      if (!pendants.length) {
        container.innerHTML = "<p>No products found.</p>";
        return;
      }

      pendants.forEach((p) => {
        // 🔹 image OR images handle
        const imgSrc = p.image
          ? p.image
          : p.images && p.images.length
            ? p.images[0]
            : "img/default.png";

        container.innerHTML += `
          <div class="product-card" onclick="openProduct('${p.id}')">
            <img 
              src="${imgSrc}" 
              alt="${p.name}"
              onerror="this.src='img/default.png'"
            />
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
      console.error("Products load error:", err);
      container.innerHTML = "<p>Unable to load products.</p>";
    });
});

// 🔹 OPEN PRODUCT DETAIL PAGE
function openProduct(id) {
  window.location.href = `product.html?id=${id}`;
}

// 🔹 OPEN PRODUCT DETAIL PAGE
function openProduct(id) {
  window.location.href = `product.html?id=${id}`;
}

// 🔹 RELATED PRODUCTS (for product.html)
function loadRelatedProducts(category, currentId) {
  const relatedBox = document.getElementById("relatedProducts");
  if (!relatedBox) return;

  const allProducts = JSON.parse(localStorage.getItem("products")) || [];

  const related = allProducts.filter(
    (p) => p.category === category && p.id !== currentId,
  );

  relatedBox.innerHTML = "";

  if (!related.length) {
    relatedBox.innerHTML = "<p>No related products found.</p>";
    return;
  }

  related.forEach((p) => {
    const imgSrc =
      p.images && p.images.length ? p.images[0] : "img/default.png";

    relatedBox.innerHTML += `
      <div class="product-card" onclick="openProduct('${p.id}')">
        <img 
          src="${imgSrc}" 
          alt="${p.name}" 
          onerror="this.src='img/default.png'"
        />
        <h3>${p.name}</h3>
        <p class="price">₹${p.price}</p>
      </div>
    `;
  });
}
