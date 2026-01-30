const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");

/* ================= LOAD PRODUCTS ================= */
const loadProducts = () => {
  fetch("https://trueluv-backend.onrender.com/api/products")
    .then((res) => res.json())
    .then((data) => {
      productList.innerHTML = "";

      data.forEach((p) => {
        const card = document.createElement("div");
        card.className = "admin-card";

        card.innerHTML = `
          <div class="admin-images">
            ${p.images.map((img) => `<img src="${img}" />`).join("")}
          </div>

          <div class="product-info">
            <h4>${p.name}</h4>
            <p>₹${p.price}</p>
            <p>Category: ${p.category}</p>
            <p style="color:${p.stock === "In Stock" ? "green" : "red"}">
              ${p.stock || "In Stock"}
            </p>
          </div>

          <button class="delete-btn" data-id="${p._id}">Delete</button>
        `;

        productList.appendChild(card);
      });

      document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          fetch(`https://trueluv-backend.onrender.com/api/products/${id}`, {
            method: "DELETE",
          }).then(() => loadProducts());
        });
      });
    })
    .catch((err) => console.error("Load Error:", err));
};

loadProducts();

/* ================= ADD PRODUCT ================= */
productForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const price = document.getElementById("price").value.trim();
  const stock = document.getElementById("stock").value;
  const category = document.getElementById("category").value;
  const desc = document.getElementById("desc").value.trim();
  const fullDesc = document.getElementById("fullDesc").value.trim();
  const images = document
    .getElementById("image")
    .value.split(",")
    .map((img) => img.trim())
    .filter((img) => img !== "");

  if (!name || !price || !category || images.length === 0) {
    alert("Please fill all required fields");
    return;
  }

  fetch("https://trueluv-backend.onrender.com/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      price,
      category,
      desc,
      fullDesc,
      images,
      stock,
    }),
  })
    .then((res) => res.json())
    .then(() => {
      productForm.reset();
      loadProducts();
    })
    .catch((err) => console.error("Add Error:", err));
});
