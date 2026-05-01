const products = [
    {
        id: 1,
        name: "Fishing Rod Pro X",
        price: "$120",
        image: "images/p1.jpg",
        description: "High quality rod for deep sea fishing.",
        featured: true
    },
    {
        id: 2,
        name: "Carbon Reel 5000",
        price: "$80",
        image: "images/p2.jpg",
        description: "Lightweight and durable reel.",
        featured: true
    },
    {
        id: 3,
        name: "Fishing Line Ultra",
        price: "$20",
        image: "images/p3.jpg",
        description: "Strong braided fishing line.",
        featured: true
    },
    {
        id: 4,
        name: "Hook Set Pro",
        price: "$15",
        image: "images/p4.jpg",
        description: "Sharp corrosion-resistant hooks.",
        featured: false
    },
    {
        id: 5,
        name: "Hook Set Pro",
        price: "$15",
        image: "images/p4.jpg",
        description: "Sharp corrosion-resistant hooks.",
        featured: false
    },
    {
        id: 6,
        name: "Hook Set Pro",
        price: "$15",
        image: "images/p4.jpg",
        description: "Sharp corrosion-resistant hooks.",
        featured: false
    },
    {
        id: 7,
        name: "Carbon Reel 5000",
        price: "$80",
        image: "images/p2.jpg",
        description: "Lightweight and durable reel.",
        featured: true
    },
    {
        id: 8,
        name: "Fishing Rod Pro X",
        price: "$120",
        image: "images/p1.jpg",
        description: "High quality rod for deep sea fishing.",
        featured: true
    }
];

const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

const product = products.find(p => p.id === id);

if (product) {
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-price").textContent = product.price;
    document.getElementById("product-image").src = product.image;
    document.getElementById("product-description").textContent = product.description;
}

//Featured products for index.html
function renderFeaturedProducts(container) {
    const featured = products.filter(p => p.featured === true);

    container.innerHTML = featured.map(p => `
        <div class="product-card">
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>${p.price}</p>
            <a href="product.html?id=${p.id}">
                <button>View</button>
            </a>
        </div>
    `).join("");
}

//Full catalog for catalog.html
function renderCatalog(container) {
    container.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>${p.price}</p>
            <a href="product.html?id=${p.id}">
                <button>View</button>
            </a>
        </div>
    `).join("");
}

//Smart controller for differentiating between index.html and catalog.html
document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("product-grid");
    if (!grid) return;

    const page = grid.dataset.page;

    if (page === "home") {
        renderFeaturedProducts(grid);
    }

    if (page === "catalog") {
        renderCatalog(grid);
    }
});