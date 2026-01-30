document.getElementById("addReviewBtn").addEventListener("click", () => {
  const name = document.getElementById("rName").value;
  const rating = Number(document.getElementById("rRating").value);
  const comment = document.getElementById("rComment").value;

  if (!name || !comment) {
    alert("Fill all fields");
    return;
  }

  fetch(`http://localhost:5000/api/products/${productId}/review`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, rating, comment }),
  })
    .then((res) => res.json())
    .then(() => {
      location.reload(); // simple refresh
    });
});
