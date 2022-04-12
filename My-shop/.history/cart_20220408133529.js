
const openCart = ({ id, img, name, price, currancy }) => {
  const modalCart = document.createElement("div");
  modalCart.classList.add("modal-cart");
  modalCart.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="modal-cart__overlay" data-close="true">
        <div class="modal-cart__window">
            <div class="modal-cart__header">
                <div class="title">Корзина покупок</div>
                <div class="modal-cart__close">&times;</div>
            </div>
            <div class="modal-cart__content">
                <div class="modal-cart__img" data-close="true">$#{img||"123"}</div>
                <div class="modal-cart__good-info">
                    <div class="modal-cart__good-name">Марка $#{name || "марка"}</div>
                    <div class="modal-cart__price">Стоимость товара $#{price ||123} $#{currancy || 123}</div>
                    <div class="modal-cart__made-in">Производитель $#{madein}</div>
                </div>
            </div>
            <div class="footer">
                <button class="modal-cart" data-close="true">Вернуться к товарам</button>
                <button class="modal-cart__buttion-buy">Оформить покупку</button>
            </div>
            
        </div>
    </div>
    `
    
  );

  document.body.appendChild(modalCart);
  console.log(modalCart);
const buttonCart = document.getElementById("btn-to-cart");
buttonCart.addEventListener("click", openCart);


  return modalCart, buttonCart;
};




