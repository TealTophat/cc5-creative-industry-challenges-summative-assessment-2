// Product database (move to backend later)
const products = [
    {
        id: 1,
        name: "Fishing Rod Pro X",
        price: "$120",
        image: "images/p1.jpg",
        description: "High quality rod for deep sea fishing."
    },
    {
        id: 2,
        name: "Carbon Reel 5000",
        price: "$80",
        image: "images/p2.jpg",
        description: "Lightweight and durable reel."
    },
    {
        id: 3,
        name: "Fishing Line Ultra",
        price: "$20",
        image: "images/p3.jpg",
        description: "Strong braided fishing line."
    }
    // etc...
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