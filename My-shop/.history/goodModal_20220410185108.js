const _createModal = ({ img, name, price, currancy, madein }) => {
  const modal = document.getElementById("vmodal");
  modal.classList.add("open");

  const goodImage = document.getElementById("good_image");
  goodImage.style = `background-image: url(${img})`;

  document.body.appendChild(modal);
  const modalClose = document.getElementById("modal_close");
  modalClose.addEventListener("click", () => {
    modal.classList.remove("open");
  });

  const buttonCart = document.getElementById("btn-to-cart"); //кнопка добавить в корзину
  buttonCart.addEventListener("click", () => {
    savedGoodToLocalStorage({ img, name, price, currancy, madein });
  });
};

const savedGoodToLocalStorage = (good) => {
  const savedGoods = window.localStorage.getItem("goods"); //получаем по ключу goods значение из localStorage
  if (savedGoods === null) {
    window.localStorage.setItem("goods", JSON.stringify([good])); //сохраняем массив из одного обьекта Good
  }
  if (savedGoods) {
    const goods = JSON.parse(savedGoods);
    window.localStorage.setItem("goods", JSON.stringify([...goods, good]));
  }
};

const showCartModal = () => {
  const buttonCart = document.getElementById("button-cart");
  buttonCart.addEventListener("click", () => {
    const savedGoods = window.localStorage.getItem("goods"); //строка в виде массива обьектов (JSON - тип данных)
    if (savedGoods) {
      const goods = JSON.parse(savedGoods); // массив сохраненных товаров в виде
      console.log(
        "🚀 ~ file: goodModal.js ~ line 38 ~ buttonCart.addEventListener ~ goods",
        goods
      );
    }
  });
};
const createCartModal = ({ name, price, currancy, madein }) => {
  return `
  <div class="modal-cart__overlay" data-close="true">
  <div class="modal-cart__window">
    <div class="modal-cart__header">
      <div class="modal-cart__title">Корзина покупок</div>
      <div class="modal-cart__close">&times;</div>
    </div>
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
    <div class="footer">
      <button class="modal-cart__buttion" data-close="true">
        Вернуться к товарам
      </button>
      <button class="modal-cart__buttion-buy">
        Оформить покупку
      </button>
    </div>
  </div>
</div>`;
};
const showSavedGoodsInCartModal = () =>{
  const modal = document.getElementById("")
}
showCartModal();
