const createSavedGood = ({ name, price, currancy, madein }) => `
  <div class="modal-cart__overlay" data-close="true">
    <div class="modal-cart__window">
      <div class="modal-cart__content">
        <div class="modal-cart__img"></div>
          <div class="modal-cart__good-info">
            <div class="modal-cart__good-name">Марка ${name}</div>
            <div class="modal-cart__price">
              Стоимость товара ${price} ${currancy}
            </div>
            <div class="modal-cart__made-in">
              Производитель ${madein}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;

const currentGood = document.getElementById("current_good");
const showSavedGoodsInCartModal = (goods) => {
  const modal = document.getElementById("cart_modal");
  modal.classList.add("open");
  goods.forEach((element) => {
    const savedGood = createSavedGood(element);
    currentGood.insertAdjacentHTML("afterbegin",savedGood);
  });
};

const buttonToClose = document.getElementById("modal-cart__close");
const modal = document.getElementById("cart_modal");
buttonToClose.addEventListener("click", () => {
  currentGood.innerHTML = "";
  modal.classList.remove("open");
});



// location.assign("http://www.mozilla.org"); // или
// location = "http://www.mozilla.org";


// window.location.href = 'redirect-url'

const checkout = document