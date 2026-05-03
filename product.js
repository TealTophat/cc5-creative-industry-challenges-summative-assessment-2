import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getFirestore, collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBCoL8qYZOhylukgIpbVviqcLR2pXNcD_Q",
    authDomain: "barracuda-business-website.firebaseapp.com",
    projectId: "barracuda-business-website",
    storageBucket: "barracuda-business-website.firebasestorage.app",
    messagingSenderId: "591496807319",
    appId: "1:591496807319:web:7f86640d0dd8fc43963ad2",
    measurementId: "G-5KGCP2XWGG"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Global product storage
let products = [];

//LOAD ALL PRODUCTS
async function loadProducts() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));

    products = querySnapshot.docs.map(doc => ({
      id: doc.id, // Firestore document ID (string)
      ...doc.data()
    }));

  } catch (error) {
    console.error("Error loading products:", error);
  }
}

//RENDER FEATURED (HOME)
function renderFeaturedProducts(container) {
  const featured = products.filter(p => p.featured === true);

  container.innerHTML = featured.map(p => `
    <div class="product-card">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>AED ${p.price}</p>
        <a href="product.html?id=${p.id}">
            <button>View</button>
        </a>
    </div>
  `).join("");
}

//RENDER FULL CATALOG
function renderCatalog(container) {
  container.innerHTML = products.map(p => `
    <div class="product-card">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>AED ${p.price}</p>
        <a href="product.html?id=${p.id}">
            <button>View</button>
        </a>
    </div>
  `).join("");
}

//LOAD SINGLE PRODUCT PAGE
async function loadSingleProduct() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) return;

  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.error("Product not found");
      return;
    }

    const product = docSnap.data();

    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-price").textContent = "AED " + product.price;
    document.getElementById("product-image").src = product.image;
    document.getElementById("product-description").textContent = product.description;

  } catch (error) {
    console.error("Error loading product:", error);
  }
}

//INIT CONTROLLER
async function initPage() {
  const grid = document.getElementById("product-grid");

  // If we're on homepage or catalog → load all products
  if (grid) {
    await loadProducts(); // 🔥 wait for Firestore

    const page = grid.dataset.page;

    if (page === "home") {
      renderFeaturedProducts(grid);
    }

    if (page === "catalog") {
      renderCatalog(grid);
    }
  }

  // Always attempt to load single product (only works on product.html)
  await loadSingleProduct();
}

// Run everything after DOM loads
document.addEventListener("DOMContentLoaded", initPage);