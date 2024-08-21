const products = [
    { name: "Beans", stock: 100 },
    { name: "Grain Maize", stock: 150 },
    { name: "Cowpeas", stock: 80 },
    { name: "G-nuts", stock: 120 },
    { name: "Rice", stock: 200 },
    { name: "Soybeans", stock: 90 }
];

const productCardsContainer = document.getElementById("product-cards");

products.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <h2>${product.name}</h2>
        <p>${product.stock} bags</p>
    `;

    productCardsContainer.appendChild(card);
});