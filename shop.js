let allProducts = [];

async function loadProducts() {
  try {
    const { data, error } = await window.supabaseClient
      .from("products") // your Supabase table
      .select("*");

    if (error) throw error;

    allProducts = data;
    displayProducts(allProducts);

  } catch (err) {
    console.error("Error loading products:", err);
  }
}

function displayProducts(productsArray) {
  const grid = document.getElementById("productsGrid");
  grid.innerHTML = "";

  productsArray.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    const imgSrc = product.image_url || 'https://via.placeholder.com/150';
    card.innerHTML = `
      <img src="${imgSrc}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.category}</p>
    `;

    card.addEventListener("click", () => openModal(product));
    grid.appendChild(card);
  });
}

// Filter by category
function filterCategory(category) {
  const filtered = allProducts.filter(p => p.category === category);
  displayProducts(filtered);
}

function showAll() {
  displayProducts(allProducts);
}

// Modal functionality
function openModal(product) {
  document.getElementById("modalImage").src = product.image_url || 'https://via.placeholder.com/300';
  document.getElementById("modalName").textContent = product.name;
  document.getElementById("modalCategory").textContent = product.category;
  document.getElementById("productModal").style.display = "block";
}

function closeModal() {
  document.getElementById("productModal").style.display = "none";
}

// Close modal on outside click
window.onclick = function(event) {
  if(event.target == document.getElementById("productModal")) closeModal();
}

// Load on page load
window.addEventListener("DOMContentLoaded", loadProducts);
