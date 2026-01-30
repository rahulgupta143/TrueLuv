// Hamburger toggle
const ham = document.querySelector(".ham");
const menu = document.querySelector(".menu");
const closeMenu = document.querySelector(".close");

ham.addEventListener("click", () => {
  menu.classList.add("active");
});

closeMenu.addEventListener("click", () => {
  menu.classList.remove("active");
});

// DM Order (for home spotlight)
function dmOrder(name, price, img) {
  const message = `Hi, I want to order this product 👇

Product: ${name}
Price: ₹${price}
Image: ${img}`;

  const whatsappUrl =
    "https://wa.me/918928080078?text=" + encodeURIComponent(message);
  window.open(whatsappUrl, "_blank");
}
