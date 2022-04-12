const buttonCart = document.getElementById("button-cart")
console.log(buttonCart)
buttonCart.addEventListener("click", openCart)


const openCart = function() {
    const modalCart = document.createElement("div")
    modalCart.classList.add("modal-cart")
    modalCart.insertAdjacentHTML()
    document.body.appendChild(modalCart)
}