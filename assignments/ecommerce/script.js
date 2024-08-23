// Add event listener to "Buy Now" buttons
document.addEventListener("DOMContentLoaded", function() {
    var buyNowButtons = document.querySelectorAll(".btn-primary");
    buyNowButtons.forEach(function(button) {
      button.addEventListener("click", function() {
        // Add product to cart
        addToCart(button.parentNode.parentNode);
      });
    });
  });
  
  // Add product to cart
  function addToCart(product) {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    var productId = product.querySelector("h3").textContent;
    var productQuantity = 1;
  
    // Check if product is already in cart
    var existingProduct = cart.find(function(item) {
      return item.id === productId;
    });
  
    if (existingProduct) {
      existingProduct.quantity += productQuantity;
    } else {
      cart.push({ id: productId, quantity: productQuantity });
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }
  
  // Update cart count
  function updateCartCount() {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    var cartCount = cart.reduce(function(acc, item) {
      return acc + item.quantity;
    }, 0);
  
    document.querySelector("#cart-count").textContent = cartCount;
  }
  
  // Display cart
  document.addEventListener("DOMContentLoaded", function() {
    var cartLink = document.querySelector("#cart-link");
    cartLink.addEventListener("click", function() {
      displayCart();
    });
  });
  
  function displayCart() {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    var cartHTML = "";
  
    cart.forEach(function(item) {
      cartHTML += `
        <li>
          <h3>${item.id}</h3>
          <p>Quantity: ${item.quantity}</p>
          <button class="btn btn-danger">Remove</button>
        </li>
      `;
    });
  
    document.querySelector("#cart-list").innerHTML = cartHTML;
  }