let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    total += price;

    document.getElementById('cart-count').innerText = cart.length;
    document.getElementById('total').innerText = total;

    renderCart();
}

function renderCart() {
    const list = document.getElementById('cart-items');
    list.innerHTML = '';

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} – ${item.price} €`;
        list.appendChild(li);
    });
}
