// 🔹 FETCH COSMETICS PRODUCTS (c1)
window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cosmeticsProducts");
  if (!container) return;

  fetch("data/products.json")
    .then((res) => res.json())
    .then((products) => {
      const cosmetics = products.filter((p) => p.category === "c1");

      if (!cosmetics.length) {
        container.innerHTML = "<p>No products found.</p>";
        return;
      }

      container.innerHTML = "";

      cosmetics.forEach((p) => {
        const imgSrc = p.images?.[0] || "img/default.png";

        container.innerHTML += `
          <div class="product-card" onclick="openProduct('${p.id}')">
            <img src="${imgSrc}" onerror="this.src='img/default.png'" />
            <h3>${p.name}</h3>
            <p>${p.desc || "No description available"}</p>
            <p class="price">₹${p.price}</p>
          </div>
        `;
      });
    })
    .catch((err) => {
      console.error(err);
      container.innerHTML = "<p>Error loading products</p>";
    });
});

// 🔹 OPEN PRODUCT
function openProduct(id) {
  window.location.href = `product.html?id=${id}`;
}

// 🔹 RELATED PRODUCTS (COSMETICS)
function loadRelatedProducts(category, currentId) {
  const relatedBox = document.getElementById("relatedProducts");
  const allProducts = JSON.parse(localStorage.getItem("products") || "[]");

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
}
