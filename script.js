// =========================
// Krepšelio logika
// =========================
let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    total += price;

    document.getElementById('cart-count').innerText = cart.length;
    document.getElementById('total').innerText = total.toFixed(2); // 2 skaitmenys po kablelio

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

// =========================
// EmailJS komentarų logika
// =========================
function sendComment() {
    const email = document.getElementById("commentEmail").value || "Nenurodytas";
    const comment = document.getElementById("commentText").value;

    if (comment.trim() === "") {
        alert("Komentaras negali būti tuščias");
        return;
    }

    emailjs.send("TAVO_SERVICE_ID", "TAVO_KOMENTARO_TEMPLATE_ID", {
        email: email,
        comment: comment
    }).then(() => {
        alert("Komentaras išsiųstas!");
        document.getElementById("commentEmail").value = "";
        document.getElementById("commentText").value = "";
    }, (err) => {
        alert("Klaida siunčiant komentarą");
        console.error(err);
    });
}
