document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("earringProducts");
  if (!container) return;

  fetch("data/products.json")
    .then(res => res.json())
    .then(products => {
      const earrings = products.filter(p => p.category === "earring");

      container.innerHTML = "";

      if (!earrings.length) {
        container.innerHTML = "<p>No earrings found.</p>";
        return;
      }

      earrings.forEach(p => {
        const imgSrc = p.images?.[0] || "img/default.png";

        container.innerHTML += `
          <div class="product-card" onclick="openProduct('${p.id}')">
            <img src="${imgSrc}" onerror="this.src='img/default.png'" />
            <h3>${p.name}</h3>
            <p>${p.desc}</p>
            <p class="price">₹${p.price}</p>
            <button onclick="event.stopPropagation(); dmOrder('${p.name}','${p.price}','${imgSrc}')">
              DM to Order
            </button>
          </div>
        `;
      });
    })
    .catch(err => {
      console.error(err);
      container.innerHTML = "<p>Error loading products</p>";
    });
});

function openProduct(id) {
  window.location.href = `product.html?id=${id}`;
}

// 🔹 OPEN PRODUCT DETAIL PAGE
function openProduct(id) {
  window.location.href = `product.html?id=${id}`;
}

// 🔹 DM to Order
function dmOrder(name, price, img) {
  const message = `Hi, I want to order this product 👇

Product: ${name}
Price: ₹${price}
Image: ${window.location.origin}/${img}`;

  const whatsappUrl =
    "https://wa.me/918928080078?text=" + encodeURIComponent(message);

  window.open(whatsappUrl, "_blank");
}

// 🔹 RELATED PRODUCTS (EARRINGS)
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
