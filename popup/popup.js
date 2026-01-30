document.addEventListener("DOMContentLoaded", () => {
  // Load popup HTML
  fetch("popup.html")
    .then((res) => res.text())
    .then((html) => {
      const container = document.createElement("div");
      container.innerHTML = html;
      document.body.appendChild(container);

      const popupSlim = document.getElementById("popupSlim");
      const closeBtn = document.getElementById("popupSlimClose");
      const imgEl = popupSlim.querySelector("img");
      const nameEl = popupSlim.querySelector(".popup-name");
      const priceEl = popupSlim.querySelector(".popup-price");
      const btnEl = popupSlim.querySelector(".popup-btn");
      const imgContainer = popupSlim.querySelector(".popup-img");

      // Close popup
      closeBtn.addEventListener("click", () => {
        popupSlim.style.left = "-300px";
      });

      // Show popup every 6 sec
      setInterval(() => {
        const randomProduct =
          popupProducts[Math.floor(Math.random() * popupProducts.length)];

        // Update content
        imgEl.src = randomProduct.img;
        nameEl.textContent = randomProduct.name;
        priceEl.textContent = randomProduct.price;

        // DM link with product name, price & image
        const dmMessage = `I want to order *${randomProduct.name}* priced at ${randomProduct.price}. Here is the product image: ${window.location.origin}/${randomProduct.img}`;
        btnEl.href = `https://wa.me/918928080078?text=${encodeURIComponent(dmMessage)}`;

        // Slide in
        popupSlim.style.left = "20px";

        // Add random hearts
        for (let i = 0; i < 3; i++) {
          const heart = document.createElement("div");
          heart.className = "heart";
          heart.style.left = Math.random() * 180 + "px";
          heart.style.top = "30px";
          imgContainer.appendChild(heart);
          setTimeout(() => heart.remove(), 1500);
        }

        // Hide after 3 sec
        setTimeout(() => {
          popupSlim.style.left = "-300px";
        }, 3000);
      }, 6000); // every 6 sec
    });
});
