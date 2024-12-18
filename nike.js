/* start header*/
/*--zone bar--*/
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');
if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}
if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}
/*--zone maps--*/
document.getElementById('find-store').addEventListener('click', function (e) {
e.preventDefault();
if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(function (position) {
const latitude = position.coords.latitude;
const longitude = position.coords.longitude;
const mapsUrl = `https://www.google.com/maps/search/Nike+Store+Near+Me/@${latitude},${longitude},10z`;
window.open(mapsUrl, '_blank');
}, function () {
alert('Unable to retrieve your location.');
});
} else {
alert('Geolocation is not supported by your browser.');
}
});
/*end header*/
/*start feature*/
/*zone main-image*/
document.querySelectorAll('.pro').forEach(product => {
    const mainImage = product.querySelector('.main-image');
    const thumbnails = product.querySelectorAll('.thumbnail');
    if (mainImage && thumbnails.length) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function () {
                const newSrc = this.getAttribute('data-full');
                if (newSrc) {
                    mainImage.setAttribute('src', newSrc);
                }
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
});
/*end feature*/
/*zone next/prev*/
const sliderContainer = document.querySelector('#fe-box1');
const nextButton = document.querySelector('#cont-next');
const prevButton = document.querySelector('#cont-prev');
function next() {
  sliderContainer.scrollBy({ left: 220, behavior: 'smooth' });
}
function prev() {
  sliderContainer.scrollBy({ left: -220, behavior: 'smooth' });
}
const cartIcon = document.getElementById('cart-icon');
const cartCount = document.getElementById('cart-count');
const cartPopup = document.getElementById('cart-popup');
const cartItemsElement = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartDisplay() {
    let total = 0;
    cartCount.textContent = cart.length; 
    cartItemsElement.innerHTML = ''; 

    cart.forEach((product, index) => {
        total += product.price * (product.quantity || 1); 
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" width="50">
            <div>
                <h5>${product.name}</h5>
                <p>$${(product.price * (product.quantity || 1)).toFixed(2)}</p>
            </div>
            <div class="product-actions">
                <button class="decrease-btn" data-index="${index}">-</button>
                <input type="number" class="quantity-input" value="${product.quantity || 1}" min="1" disabled>
                <button class="increase-btn" data-index="${index}">+</button>
            </div>
            <button class="remove-item" data-index="${index}"><i class="fas fa-trash"></i></button>
        `;
        cartItemsElement.appendChild(cartItem);
    });

    totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = button.getAttribute('data-index');
            removeFromCart(index);
        });
    });

    document.querySelectorAll('.decrease-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = button.getAttribute('data-index');
            decreaseQuantity(index);
        });
    });

    document.querySelectorAll('.increase-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = button.getAttribute('data-index');
            increaseQuantity(index);
        });
    });
}
function addToCart(product) {
    const existingProductIndex = cart.findIndex(p => p.id === product.id);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 1) + 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    saveCartToLocalStorage();
    updateCartDisplay();
}
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCartToLocalStorage();
    updateCartDisplay();
}
function increaseQuantity(index) {
    cart[index].quantity = (cart[index].quantity || 1) + 1;
    saveCartToLocalStorage();
    updateCartDisplay();
}
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        saveCartToLocalStorage();
        updateCartDisplay();
    }
}
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
cartIcon.addEventListener('click', () => {
    cartPopup.style.display = cartPopup.style.display === 'none' ? 'block' : 'none';
});
document.querySelectorAll('.cart').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const product = button.closest('.pro');
        const image = product.querySelector('.main-image').src;
        const name = product.querySelector('h5').textContent;
        const price = parseFloat(product.querySelector('h4').textContent.replace('$', ''));
        const id = product.dataset.id || `${name}-${Date.now()}`;
        addToCart({ id, image, name, price });
    });
});
updateCartDisplay();
document.querySelectorAll('#featured .cart').forEach((button) => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const product = button.closest('.box');
        const image = product.querySelector('img').src;
        const name = product.querySelector('h5').textContent;
        const price = parseFloat(product.querySelector('h4').textContent.replace('$', ''));
        const id = product.dataset.id || `${name}-${Date.now()}`;
        addToCart({ id, image, name, price });
    });
});
/*payment*/
const checkoutBtn = document.getElementById('checkout-btn');
const paymentModal = document.getElementById('payment-modal');
const closeModal = document.getElementById('close-modal');
const paymentForm = document.getElementById('payment-form');
checkoutBtn.addEventListener('click', () => {
    paymentModal.classList.remove('hidden');
});
closeModal.addEventListener('click', () => {
    paymentModal.classList.add('hidden');
});
paymentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const cardName = document.getElementById('card-name').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;
    if (cardName && cardNumber.length === 16 && expiryDate.length === 5 && cvv.length === 3) {
        alert('Payment Successful!');
        paymentModal.classList.add('hidden');
    } else {
        alert('Please fill out all fields correctly.');
    }
});





