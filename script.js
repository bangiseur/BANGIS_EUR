// =========================
// Krepšelio logika
// =========================
//let cart = [];
//let total = 0;
let cart = {};
let total = 0;

/*function addToCart(name, price) {
    cart.push({ name, price });
    total += price;

    document.getElementById('cart-count').innerText = cart.length;
    document.getElementById('total').innerText = total.toFixed(2);

    renderCart();
}*/

function addToCart(name, price) {
    if (!cart[name]) {
        cart[name] = { price: price, qty: 1 };
    } else {
        cart[name].qty++;
    }

    total += price;

    document.getElementById('cart-count').innerText =
        Object.values(cart).reduce((a, b) => a + b.qty, 0);

    document.getElementById('total').innerText = total.toFixed(2);
    renderCart();
}


/*function renderCart() {
    const list = document.getElementById('cart-items');
    list.innerHTML = '';

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} – ${item.price} €`;
        list.appendChild(li);
    });
}*/

function renderCart() {
    const list = document.getElementById('cart-items');
    list.innerHTML = '';

    for (let item in cart) {
        const li = document.createElement('li');
        li.textContent = `${item} – ${cart[item].qty} vnt. (${cart[item].price} €)`;
        list.appendChild(li);
    }
}

function buy() {
    const buyerEmail = document.getElementById("buyerEmail").value;

    if (!buyerEmail) {
        alert("Įvesk el. paštą");
        return;
    }

    if (Object.keys(cart).length === 0) {
        alert("Krepšelis tuščias");
        return;
    }

    let orderText = "";
    for (let item in cart) {
        orderText += `${item} – ${cart[item].qty} vnt.\n`;
    }

    emailjs.send("service_prjshlp", "template_3tqcomc", {
        buyer_email: buyerEmail,
        order: orderText,
        total: total.toFixed(2)
    }).then(() => {
        alert("Užsakymas išsiųstas!");

        cart = {};
        total = 0;
        renderCart();
        document.getElementById('total').innerText = "0";
        document.getElementById('cart-count').innerText = "0";
        document.getElementById("buyerEmail").value = "";
    }, (err) => {
        alert("Klaida siunčiant užsakymą");
        console.error(err);
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

    emailjs.send("service_prjshlp", "template_qoj6hgv", {
        email: commentEmail,
        comment: commentText
    }).then(() => {
        alert("Komentaras išsiųstas!");
        document.getElementById("commentEmail").value = "";
        document.getElementById("commentText").value = "";
    }, (err) => {
        alert("Klaida siunčiant komentarą");
        console.error(err);
    });
}
