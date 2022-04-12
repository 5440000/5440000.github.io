const closeModal = (arrVar) => {
  const modalClose = document.getElementById("modal_close");

  modalClose.addEventListener("click", () => {
    arrVar.forEach((element) => {
      const parentGood = element.parentNode;
      const goodId = element.id;
      parentGood.removeChild(element);
      const goodSpanNew = document.createElement("span");
      goodSpanNew.id = goodId;
      parentGood.append(goodSpanNew);
    });
    modal.classList.remove("open");
  });

}

const _createModal = ({ img, name, price, currancy, madein }) => {
  const modal = document.getElementById("vmodal");
  modal.classList.add("open");

  const goodImage = document.getElementById("good_image");
  goodImage.style = `background-image: url(${img})`;
  const goodName = document.getElementById("good_title");
  goodName.append(`${name}`);
  const goodMark = document.getElementById("good_mark");
  goodMark.append(`${name}`);
  const goodPrice = document.getElementById("good_price");
  goodPrice.append(`${price}`, `${currancy}`);
  const goodMadeIn = document.getElementById("good_madein");
  goodMadeIn.append(`${madein}`);

  const arrVar = [goodName, goodMark, goodPrice, goodMadeIn];

  document.body.appendChild(modal);

  closeModal(arrVar)

  const modalCloseBtn = document.getElementById("button-to-close-modal");
  modalCloseBtn.addEventListener("click", () => {
    // arrVar.forEach(element => {
    //   const parentGood = element.parentNode;
    //   parentGood.removeChild(element);
    //   const goodSpanNew = document.createElement("span");
    //   element.id = "good_title";
    //   parentGood.append(goodSpanNew)});
    // modal.classList.remove("open");
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
      showSavedGoodsInCartModal(goods);
    }
  });
};

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

const showSavedGoodsInCartModal = (goods) => {
  const modal = document.getElementById("cart_modal");
  const cartFooter = document.getElementById("cart_footer");
  modal.classList.add("open");
  goods.forEach((element) => {
    const savedGood = createSavedGood(element);
    cartFooter.insertAdjacentHTML("beforebegin", savedGood);
  });
};

const buttonToClose = document.getElementById("modal-cart__close");
const modal = document.getElementById("cart_modal");
buttonToClose.addEventListener("click", () => {
  modal.classList.remove("open");
});
showCartModal();
