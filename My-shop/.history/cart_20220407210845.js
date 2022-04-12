const buttonCart = document.getElementById("button-cart")
console.log(buttonCart)
buttonCart.addEventListener("click", openCart)


const openCart = function() {
    const cart = document.createElement("div")
    cart.classList.add("modal-cart")

    document.body.appendChild(cart)
}