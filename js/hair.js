window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("hairProducts");

  fetch("https://trueluv-backend.onrender.com/api/products/category/hair")
    .then((res) => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    })
    .then((data) => {
      container.innerHTML = "";

      if (!data.length) {
        container.innerHTML = "<p>No products found in this category.</p>";
        return;
      }

      data.forEach((p) => {
        container.innerHTML += `
         <div class="product-card" onclick="openProduct('${p._id}')">
            <img src="${p.images[0]}" />
            <h3>${p.name}</h3>
                   <p>${p.desc || p.shortDesc}</p>
            <p class="price">₹${p.price}</p>
            <button onclick="dmOrder('${p.name}','${p.price}','${p.images[0]}')">
              DM to Order
            </button>
          </div>
        `;
      });
    })
    .catch((err) => {
      console.error("Fetch Error:", err);
      container.innerHTML =
        "<p>Failed to load products. Please try again later.</p>";
    });
});

// 🔹 OPEN PRODUCT
function openProduct(id) {
  window.location.href = `product.html?id=${id}`;
}

// 🔹 DM to order function
function dmOrder(name, price, img) {
  const message = `Hi, I want to order this product 👇

Product: ${name}
Price: ₹${price}
Image: ${window.location.origin}/${img}`;

  const whatsappUrl =
    "https://wa.me/918928080078?text=" + encodeURIComponent(message);

  window.open(whatsappUrl, "_blank");
}

// 🔹 FETCH RELATED PRODUCTS (EXCLUDE CURRENT PRODUCT)
function loadRelatedProducts(category, currentId) {
  const relatedBox = document.getElementById("relatedProducts");

  fetch(
    `https://trueluv-backend.onrender.com/api/products/category/${category}`,
  )
    .then((res) => res.json())
    .then((data) => {
      // Remove the current product from the list
      const related = data.filter((p) => p._id !== currentId);

      relatedBox.innerHTML = "";

      if (!related.length) {
        relatedBox.innerHTML = "<p>No related products found.</p>";
        return;
      }

      related.forEach((p) => {
        relatedBox.innerHTML += `
          <div class="product-card" onclick="openProduct('${p._id}')">
            <img src="${p.images[0]}" alt="${p.name}" />
            <h3>${p.name}</h3>
            <p class="price">₹${p.price}</p>
          </div>
        `;
      });
    })
    .catch((err) => {
      console.error("Related Products Error:", err);
      relatedBox.innerHTML =
        "<p>Failed to load related products. Please try again later.</p>";
    });
}
