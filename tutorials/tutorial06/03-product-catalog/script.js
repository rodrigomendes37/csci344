const productForm = document.querySelector("#productForm");
const productGrid = document.querySelector("#productGrid");

const productNameInput = document.querySelector("#productName");
const productPriceInput = document.querySelector("#productPrice");
const productDescriptionInput = document.querySelector("#productDescription");
const productCategorySelect = document.querySelector("#productCategory");
const productInStockCheckbox = document.querySelector("#productInStock");

const products = [
  {
    name: "Wireless Headphones",
    price: 79.99,
    description: "Bluetooth headphones with noise isolation and long battery life.",
    category: "Electronics",
    inStock: true,
  },
  {
    name: "Air Fryer",
    price: 99.5,
    description: "Crispy food with less oil. Great for quick meals.",
    category: "Appliances",
    inStock: false,
  },
  {
    name: "Desk Lamp",
    price: 24.0,
    description: "Adjustable LED lamp with 3 brightness settings.",
    category: "Furniture",
    inStock: true,
  },
];

function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

function createProductCard(product) {
    const stockHTML = product.inStock
    ? `<span class="stock-status in-stock">In Stock</span>`
    : `<span class="stock-status out-of-stock">Out of Stock</span>`;

  return `
    <div class="product-card">
      <h2>${product.name}</h2>
      <div class="price">${formatPrice(product.price)}</div>
      <p class="description">${product.description}</p>
      <span class="category">${product.category}</span>
      ${stockHTML}
    </div>
  `;
}


function renderProducts() {
    // clear the grid
    productGrid.innerHTML = "";

    // for loop from 0 to products.length
    for (let i = 0; i < products.length; i++) {
        const product = products[i];

        // create card HTML + append to grid
        const cardHTML = createProductCard(product);
        productGrid.insertAdjacentHTML("beforeend", cardHTML);
    }
}


function addItemToList(event) {
    event.preventDefault();


    const name = productNameInput.value.trim();
    const price = parseFloat(productPriceInput.value);
    const description = productDescriptionInput.value.trim();
    const category = productCategorySelect.value;
    const inStock = productInStockCheckbox.checked;

    const newProduct = {
        name: name,
        price: price,
        description: description,
        category: category,
        inStock: inStock,
    };


    products.push(newProduct);

    renderProducts();

    productForm.reset();
}

productForm.addEventListener("submit", addItemToList);

renderProducts();